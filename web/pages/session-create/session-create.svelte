<script lang="ts">
import _ from "lodash";

import {getChildItems} from "@/lib/bookmark";
import BookmarkBrowser from "@/components/bookmark-browser/bookmark-browser.svelte";

/** user's current folder path */
var path:BookmarkPath=$state([]);

/** the currently showing bookmark items */
var bookmarkItems:BookmarkItem[]=$state([]);

/** list of selected bookmark folder paths */
var selectedItems:BookmarkPath[]=$state([]);

// on path changing, refresh the items
// todo: anyway to make items derived? it is async so doesn't seem like it?
$effect(()=>{
    path;
    refreshItems();
});

/** reload the items based on the current path */
async function refreshItems():Promise<void>
{
    const gotItems:BookmarkItem[]|null=await getChildItems(path);

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
        <div class="items">
            <div class="checkout-item">
                <div class="name">
                    an item
                </div>
                <div class="count">
                    12
                </div>
            </div>
            <div class="checkout-item">
                <div class="name">
                    another / item
                </div>
                <div class="count">
                    120
                </div>
            </div>
        </div>
        <div class="submit">
            <div class="totals">
                <p class="text">Total</p>
                <p class="count">1233</p>
            </div>

            <div class="submit-button">
                <a href="">submit</a>
            </div>
        </div>
    </div>
</main>