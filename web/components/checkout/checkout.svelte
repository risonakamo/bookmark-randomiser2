<script lang="ts">
import _ from "lodash";

import {createSession} from "@/lib/session";
import {addSession} from "@/lib/storage";
import {getChildItemsMultiple} from "@/lib/bookmark";

var {
    selectedItems=$bindable([])
}:{
    selectedItems:BookmarkItem[]
}=$props();

/** total count of inner bookmark items from selected bookmark folders */
var itemCount:number=$derived.by(()=>{
    return _.sumBy(selectedItems,(item:BookmarkItem):number=>{
        return item.items;
    });
});

/** can't submit if no items */
var submitDisabled:boolean=$derived(itemCount==0);

/** clicked on a checkout item. remove it from selected items */
function h_checkoutItemClick(item:BookmarkItem)
{
    return ()=>{
        selectedItems=_.reject(selectedItems,(anItem:BookmarkItem):boolean=>{
            return anItem.id==item.id;
        });
    };
}

/** clicked submit. create new session from the selected items and push to storage */
async function h_submit(e:MouseEvent):Promise<void>
{
    e.preventDefault();

    if (!selectedItems.length)
    {
        console.log("no items, not making session");
        return;
    }

    var items:RealBookmarkItem[]=await getChildItemsMultiple(
        _.map(selectedItems,(item:BookmarkItem):string=>{
            return item.id;
        })
    );

    items=_.shuffle(items);

    await addSession(createSession(items,$state.snapshot(selectedItems)));

    window.location.href="/build/session-select.html";
}
</script>

<style lang="sass">
    @use "./checkout.sass"
</style>

<div class="checkout">
    <div class="items">
        {#each selectedItems as item (item.id)}
            <div class="checkout-item" onclick={h_checkoutItemClick(item)}>
                <div class="name">
                    {#each item.path as pathItem (pathItem)}
                        <span class="slash">/</span>
                        <span class="path-item">{pathItem}</span>
                    {/each}
                </div>
                <div class="count">
                    {item.items}
                </div>
            </div>
        {/each}
    </div>
    <div class="submit">
        <div class="totals">
            <p class="text">Total</p>
            <p class="count">{itemCount}</p>
        </div>

        <div class="submit-button">
            <a href="" onclick={h_submit} class:disabled={submitDisabled}>submit</a>
        </div>
    </div>
</div>