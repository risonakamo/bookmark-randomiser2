<script lang="ts">
// session info box appearing on session select page

import {createSessionTitle} from "@/lib/session";
import {createRandomiserUrl} from "@/lib/url-query";

var {
    session,

    ondelete,
    onduplicate,
}:{
    session:RandomisationSession,

    ondelete(session:RandomisationSession):void,
    onduplicate(session:RandomisationSession,title:string):void,
}=$props();

/** if the duplicate menu is showing */
var duplicateMenuShowing:boolean=$state(false);

/** contents of the duplicate menu title textbox */
var duplicateTitle:string=$state("");

/** url to go to randomiser page targetting this session */
var randomiserUrl:string=$derived(createRandomiserUrl(session.id));
/** if this session is marked as complete */
var sessionComplete:boolean=$derived(session.position>=session.items.length);

/** text of the duplicate button */
var duplicateButtonText:string=$derived.by(()=>{
    if (duplicateMenuShowing)
    {
        return "do duplicate";
    }

    return "duplicate";
});

/** clicked delete button. call delete event with the session */
function h_delete(e:MouseEvent):void
{
    e.preventDefault();
    ondelete(session);
}

/** clicked duplicate button. do action based on if duplicate menu is showing */
function h_duplicate(e:MouseEvent):void
{
    e.preventDefault();

    // if menu not showing, show the menu, and set the title select box contents
    // to the current session's title.
    if (!duplicateMenuShowing)
    {
        duplicateTitle=session.title;
        duplicateMenuShowing=true;
    }

    // otherwise, the duplicate menu was already showing. perform the duplication using
    // the duplicate menu textbox contents as the title. if the textbox was empty,
    // generate a title.
    // then, hide the duplicate menu.
    else
    {
        var newTitle:string=duplicateTitle.trim();

        if (newTitle.length==0)
        {
            newTitle=createSessionTitle(session.originDirs);
        }

        onduplicate(
            $state.snapshot(session),
            newTitle,
        );

        duplicateMenuShowing=false;
    }
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
        <a href="" onclick={h_duplicate}>{duplicateButtonText}</a>
        <div class="duplicate-menu" class:hidden={!duplicateMenuShowing}>
            <label>New Title:</label>
            <input type="text" bind:value={duplicateTitle}/>
        </div>
    </div>
</div>