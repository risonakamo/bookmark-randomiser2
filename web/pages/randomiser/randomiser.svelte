<script lang="ts">
import {onMount} from "svelte";
import _ from "lodash";

import {getSession, getSessions, updateSession} from "@/lib/storage";
import {randomiserUrlArgs} from "@/lib/url-query";
import {createSessionTitle} from "@/lib/session";
import {getFaviconUrl} from "@/lib/bookmark";

/** possible button mode states */
type ButtonMode="open"|"generate";

/** when generate, randomly picks amount of items to generate. this is the smallest amount
 *  of items that can be generated */
const generateAmountMin:number=8;
/** largest amount of items that can be generated */
const generateAmountMax:number=15;

/** the current session */
var session:RandomisationSession=$state({
    id:"",
    title:"",
    items:[],
    position:0,
    createdDate:"",
    lastUpdateDate:"",
    originDirs:[],
});

/** position of the session on first load */
var initialSessionPosition:number=$state(0);

/** the currently showing items */
var items:RealBookmarkItem[]=$state([]);

/** if on, opening tabs will focus the 1st tab opened */
var autoFocusFirst:boolean=$state(true);

/** if enabled, on opening items, will also generate more items. skips user ever
 *  needing to press generate button */
var autoGenNextItems:boolean=$state(true);

/** the current button mode */
var buttonMode:ButtonMode=$state("open");

/** last picked generate amount */
var lastGenerateAmount:number=0;

/** text of the main button */
var buttonText:string=$derived.by(()=>{
    if (buttonMode=="open")
    {
        return "Open";
    }

    return "Generate";
});

/** session is done */
var sessionComplete:boolean=$derived(session.position>=session.items.length);

/** same as as session position, but caps at the session total size */
var cleanSessionPosition=$derived(Math.min(session.position,session.items.length));

/** amount the session position has changed */
var sessionPositionChange:number=$derived(session.position-initialSessionPosition);

// on page load, try to load the session indicated by url args. then, do initial generation
// based on the position.
onMount(async ()=>{
    const args:RandomiserPageArgs=randomiserUrlArgs();

    if (!args.sessionId)
    {
        console.error("did not provide session id");
        return;
    }

    const foundSession:RandomisationSession|undefined=await getSession(args.sessionId);

    if (!foundSession)
    {
        console.error("could not find target session:",args.sessionId);
        console.error("available sessions:");
        console.log(await getSessions());
        return;
    }

    session=foundSession;
    initialSessionPosition=session.position;
    newGenerateAmount();
    generateItems(lastGenerateAmount);
    document.title=`Bookmarks Randomiser: ${session.title}`;

    console.log("loaded",session);
    console.log("items",items);
});

/** load the current items given the current position */
function generateItems(generateAmount:number):void
{
    if (session.position>=session.items.length)
    {
        items=[];
        return;
    }

    items=session.items.slice(session.position,session.position+generateAmount);
}

/** open all the current items */
function openItems():void
{
    for (let itemI=0;itemI<items.length;itemI++)
    {
        const item:RealBookmarkItem=items[itemI];
        var active:boolean=false;

        if (autoFocusFirst && itemI==0)
        {
            active=true;
        }

        chrome.tabs.create({
            url:item.url,
            active,
        });
    }
}

/** pick a new random generate amount. advance the session by that amount, then generate items
 *  also using that amount */
async function advancePosition():Promise<void>
{
    // do nothing if already at the end
    if (session.position>=session.items.length)
    {
        return;
    }

    session.position+=lastGenerateAmount;

    // ensuring adding to the position caps at the session max size
    session.position=Math.min(session.position,session.items.length);

    const updatedSession:RandomisationSession|undefined=await updateSession(
        session.id,
        session.position
    );

    if (!updatedSession)
    {
        console.error("failed to update session");
        return;
    }

    session=updatedSession;

    newGenerateAmount();
    generateItems(lastGenerateAmount);
}

/** set the last generate amount */
function newGenerateAmount():void
{
    lastGenerateAmount=_.random(generateAmountMin,generateAmountMax);
}

/** clicked on main button. do action based on the current mode.
 *  - if in generate mode, advance position, and regenerate items. then, switch to open mode.
 *  - if in open mode, open all the current items. then switch to generate mode.
 *    - if auto generate turned on, open will immediately run generate actions, which will
 *      place mode back into open mode, until it is turned off*/
function h_mainButton(e:MouseEvent):void
{
    e.preventDefault();

    if (buttonMode=="generate")
    {
        advancePosition();
        buttonMode="open";
    }

    else if (buttonMode=="open")
    {
        openItems();
        buttonMode="generate";

        // trigger gen actions if set to autogen
        if (autoGenNextItems)
        {
            advancePosition();
            buttonMode="open";
        }
    }
}

/** clicked skip button. advance position and generate new items, and force into open mode */
function h_skipButton(e:MouseEvent):void
{
    e.preventDefault();
    advancePosition();
    buttonMode="open";
}

/** clicked on link. open link in new tab */
function h_clickLink(e:MouseEvent)
{
    e.preventDefault();

    const focus:boolean=e.ctrlKey;

    chrome.tabs.create({
        url:(e.currentTarget as HTMLAnchorElement).href,
        active:focus
    });
}
</script>

<style lang="sass">
    @use "./randomiser.sass"
</style>

<main>
    <a href="./session-select.html">Back to Main Page</a>
    <div class="info">
        <h1>{session.title}</h1>
        <p>created: {session.createdDate}</p>
        <p>updated: {session.lastUpdateDate}</p>
        <ul>
            {#each session.originDirs as originDir (originDir.id)}
                <li>{originDir.title}</li>
            {/each}
        </ul>
    </div>

    <div class="progress">
        <p>progress: {cleanSessionPosition} / {session.items.length}</p>
        <p>items generated: {sessionPositionChange}</p>
    </div>

    <div class="gen-zone">
        {#if !sessionComplete}
            <div class="buttons">
                <h2><a href="" onclick={h_mainButton}>{buttonText}</a></h2>
                <h3><a href="" onclick={h_skipButton}>skip</a></h3>

                <div class="settings">
                    <span>
                        <input type="checkbox" bind:checked={autoFocusFirst}>
                        <span>Focus 1st Open Tab</span>
                    </span>
                    <span>
                        <input type="checkbox" bind:checked={autoGenNextItems}>
                        <span>Auto Generate Next Items</span>
                    </span>
                </div>
            </div>

            <div class="items">
                <ul>
                    {#each items as item,itemI (item.id)}
                        {@const iconUrl:string=getFaviconUrl(item.url)}
                        <li class="item">
                            <span>{session.position+itemI+1}.</span>
                            <span class="icon">
                                <img src={iconUrl} alt="missing"/>
                            </span>
                            <a href={item.url} onclick={h_clickLink}>{item.title}</a>
                        </li>
                    {/each}
                </ul>
            </div>
        {:else}
            <p>Session Complete</p>
        {/if}
    </div>
</main>