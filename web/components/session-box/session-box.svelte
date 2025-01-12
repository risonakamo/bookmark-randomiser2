<script lang="ts">
// session info box appearing on session select page

import {createRandomiserUrl} from "@/lib/url-query";

var {
    session,

    ondelete,
    onduplicate,
}:{
    session:RandomisationSession,

    ondelete(session:RandomisationSession):void,
    onduplicate(session:RandomisationSession):void,
}=$props();

var randomiserUrl:string=$derived(createRandomiserUrl(session.id));
var sessionComplete:boolean=$derived(session.position>=session.items.length);

/** clicked delete button. call delete event with the session */
function h_delete(e:MouseEvent):void
{
    e.preventDefault();
    ondelete(session);
}

/** clicked duplicate button. call duplicate event with session */
function h_duplicate(e:MouseEvent):void
{
    e.preventDefault();
    onduplicate(session);
}
</script>

<style lang="sass">
    @use "./session-box.sass"
</style>

<div class="session-box">
    <h2>
        {#if !sessionComplete}
            <a href={randomiserUrl}>{session.title}</a>
        {:else}
            <s>{session.title}</s>
        {/if}
    </h2>
    <p>created: {session.createdDate}</p>
    <p>updated: {session.lastUpdateDate}</p>
    <p>progress: {session.position}/{session.items.length}</p>
    <p>items:</p>
    <ul>
        {#each session.originDirs as originDir (session.id+originDir.id)}
            <li>{originDir.title}</li>
        {/each}
    </ul>
    <div class="controls">
        <a href="" onclick={h_delete}>delete</a>
        <a href="" onclick={h_duplicate}>duplicate</a>
        <div>
            <label>New Title:</label>
            <input type="text"/>
        </div>
    </div>
</div>