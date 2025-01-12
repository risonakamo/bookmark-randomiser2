<script lang="ts">
import {onMount} from "svelte";

import {addSession, deleteSession, getSessions} from "@/lib/storage";
import {duplicateSession, sortSessions} from "@/lib/session";
import {createRandomiserUrl} from "@/lib/url-query";

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
function h_delete(session:RandomisationSession)
{
    return async (e:MouseEvent)=>{
        e.preventDefault();
        sessions=sortSessions(await deleteSession(session.id));
    };
}

/** duplicate button. duplicate a session and update the session list */
function h_duplicate(session:RandomisationSession)
{
    return async (e:MouseEvent)=>{
        e.preventDefault();
        const newSession:RandomisationSession=await duplicateSession(session,session.title);
        sessions=sortSessions(await addSession(newSession));
    };
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
                {@const randomiserUrl:string=createRandomiserUrl(session.id)}
                {@const sessionComplete:boolean=session.position>=session.items.length}

                <div class="session">
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
                        <a href="" onclick={h_delete(session)}>delete</a>
                        <a href="" onclick={h_duplicate(session)}>duplicate</a>
                    </div>
                </div>
            {/each}
        {:else}
            <p>no sessions</p>
        {/if}
    </div>
</main>