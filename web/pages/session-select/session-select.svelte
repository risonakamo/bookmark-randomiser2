<script lang="ts">
import {onMount} from "svelte";

import {addSession, deleteSession, getSessions} from "@/lib/storage";
import {duplicateSession, sortSessions} from "@/lib/session";
import SessionBox from "@/components/session-box/session-box.svelte";

/** the sessions */
var sessions:RandomisationSession[]=$state([]);

// get sessions from storage
onMount(async ()=>{
    sessions=sortSessions(await getSessions());
    console.log(sessions);
});

/** clear the storage */
function h_resetButton():void
{
    chrome.storage.local.clear();
    window.location.reload();
}

/** delete button. trigger delete of session, and refresh the session list with delete result */
async function h_delete(session:RandomisationSession)
{
    sessions=sortSessions(await deleteSession(session.id));
}

/** duplicate button. duplicate a session and update the session list */
async function h_duplicate(session:RandomisationSession,title:string)
{
    const newSession:RandomisationSession=await duplicateSession(session,title);
    sessions=sortSessions(await addSession(newSession));
}
</script>

<style lang="sass">
    @use "./session-select.sass"
</style>

<main>
    <div class="toolbar">
        <h2><a href="/build/session-create.html">create session</a></h2>
        <h2><a href="" onclick={h_resetButton}>reset storage</a></h2>
    </div>
    <div class="sessions">
        {#if sessions.length>0}
            {#each sessions as session (session.id)}
                <SessionBox session={session} ondelete={h_delete} onduplicate={h_duplicate}/>
            {/each}
        {:else}
            <p>no sessions</p>
        {/if}
    </div>
</main>