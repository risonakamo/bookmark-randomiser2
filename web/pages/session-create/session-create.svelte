<script lang="ts">
import _ from "lodash";
import {onMount} from "svelte";

import {bookmarkItemsPathToStringPath, getChildItems} from "@/lib/bookmark";
import BookmarkBrowser from "@/components/bookmark-browser/bookmark-browser.svelte";
import Checkout from "@/components/checkout/checkout.svelte";
import {getSessions} from "@/lib/storage";

/** user's current folder path */
var path:BookmarkItem[]=$state([]);

/** the currently showing bookmark items */
var bookmarkItems:BookmarkItem[]=$state([]);

/** list of selected bookmark folder paths */
var selectedItems:BookmarkItem[]=$state([]);

// on path changing, refresh the items
// todo: anyway to make items derived? it is async so doesn't seem like it?
$effect(()=>{
    path;
    refreshItems();
});

onMount(async ()=>{
    console.log(await getSessions());
});

/** reload the items based on the current path */
async function refreshItems():Promise<void>
{
    const gotItems:BookmarkItem[]|null=await getChildItems(bookmarkItemsPathToStringPath(path));

    if (gotItems==null)
    {
        console.error("failed to get items for some reason");
    }

    else
    {
        bookmarkItems=gotItems;
    }
}
</script>

<style lang="sass">
    @use "./session-create.sass"
</style>

<main>
    <div class="browser">
        <BookmarkBrowser items={bookmarkItems} bind:path={path}
            bind:selectedItems={selectedItems}/>
    </div>
    <div class="checkout">
        <Checkout bind:selectedItems={selectedItems}/>
    </div>
</main>