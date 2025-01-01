<script lang="ts">
import {onMount} from "svelte";

import {getSession, getSessions} from "@/lib/storage";
import {randomiserUrlArgs} from "@/lib/url-query";
import {createSessionTitle} from "@/lib/session";

/** the current session */
var session:RandomisationSession=$state({
    id:"",
    items:[],
    position:0,
    createdDate:"",
    lastUpdateDate:"",
    originDirs:[],
});

// on page load, try to load the session indicated by url args
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
    console.log("loaded",session);
});
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
        <ol>
            <li class="item">
                <div class="icon"></div>
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
        </ol>
    </div>
</main>