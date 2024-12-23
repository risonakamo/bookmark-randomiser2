<script lang="ts">
import {onMount} from "svelte";

import {getChildItems} from "@/lib/bookmark";
import BookmarkBrowser from "@/components/bookmark-browser/bookmark-browser.svelte";

// on page load, load initial bookmark items
onMount(async ()=>{
    const gotItems:BookmarkItem[]|null=await getChildItems([]);

    if (gotItems==null)
    {
        console.error("failed to get items for some reason");
    }

    else
    {
        console.log(gotItems);
        bookmarkItems=gotItems;
    }
});

/** user's current folder path */
var path:BookmarkPath=$state([]);

/** the currently showing bookmark items */
var bookmarkItems:BookmarkItem[]=$state([]);
</script>

<style lang="sass">
    @use "./session-create.sass"
</style>

<main>
    <div class="browser">
        <BookmarkBrowser items={bookmarkItems} path={path}/>
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