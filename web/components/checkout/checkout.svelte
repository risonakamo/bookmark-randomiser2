<script lang="ts">
import _ from "lodash";

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

/** clicked on a checkout item. remove it from selected items */
function h_checkoutItemClick(item:BookmarkItem)
{
    return ()=>{
        selectedItems=_.reject(selectedItems,(anItem:BookmarkItem):boolean=>{
            return anItem.id==item.id;
        });
    };
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
            <a href="">submit</a>
        </div>
    </div>
</div>