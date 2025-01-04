<script lang="ts">
import {onMount} from "svelte";

import {getSession, getSessions, updateSession} from "@/lib/storage";
import {randomiserUrlArgs} from "@/lib/url-query";
import {createSessionTitle} from "@/lib/session";
import {getFaviconUrl} from "@/lib/bookmark";

/** possible button mode states */
type ButtonMode="open"|"generate";

/** items per generation */
const generateAmount:number=10;

/** the current session */
var session:RandomisationSession=$state({
    id:"",
    items:[],
    position:0,
    createdDate:"",
    lastUpdateDate:"",
    originDirs:[],
});

/** the currently showing items */
var items:RealBookmarkItem[]=$state([]);

/** if on, opening tabs will focus the 1st tab opened */
var autoFocusFirst:boolean=$state(true);

/** if enabled, on opening items, will also generate more items. skips user ever
 *  needing to press generate button */
var autoGenNextItems:boolean=$state(true);

/** the current button mode */
var buttonMode:ButtonMode=$state("open");

/** text of the main button */
var buttonText:string=$derived.by(()=>{
    if (buttonMode=="open")
    {
        return "Open";
    }

    return "Generate";
});

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
    generateItems();

    console.log("loaded",session);
    console.log("items",items);
});

/** load the current items given the current position */
function generateItems():void
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

/** advance the current position in the session. modifies the session, and generates new items */
async function advancePosition():Promise<void>
{
    session.position+=generateAmount;

    const updatedSession:RandomisationSession|undefined=await updateSession(session.id,session.position);

    if (!updatedSession)
    {
        console.error("failed to update session");
        return;
    }

    session=updatedSession;
    generateItems();
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
</script>

<style lang="sass">
    @use "./randomiser.sass"
</style>

<main>
    <div class="info">
        <h1>{createSessionTitle(session)}</h1>
        <p>created: {session.createdDate}</p>
        <p>updated: {session.lastUpdateDate}</p>
        <ul>
            {#each session.originDirs as originDir (originDir.id)}
                <li>{originDir.title}</li>
            {/each}
        </ul>
    </div>

    <div class="progress">
        <p>progress: {session.position} / {session.items.length}</p>
        <p>10 items opened</p>
    </div>

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
                    <a href={item.url}>{item.title}</a>
                </li>
            {/each}
        </ul>
    </div>
</main>