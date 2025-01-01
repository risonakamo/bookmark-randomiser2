<script lang="ts">
import {onMount} from "svelte";

import {getSession, getSessions} from "@/lib/storage";
import {randomiserUrlArgs} from "@/lib/url-query";
import {createSessionTitle} from "@/lib/session";

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
var items:RealBookmarkItem[]=[];

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
        <p>progress: 0 / 1000</p>
        <p>10 items opened</p>
    </div>

    <div class="buttons">
        <h2><a href="">Open</a></h2>
        <p><a href="">skip</a></p>
    </div>

    <div class="items">
        <ul>
            <li class="item">
                <span>1.</span>
                <span class="icon"></span>
                <a href="">item name</a>
            </li>
            <li class="item">
                <div class="icon"></div>
                <a href="">item name</a>
            </li>
            <li class="item">
                <div class="icon"></div>
                <a href="">item name</a>
            </li>
        </ul>
    </div>
</main>