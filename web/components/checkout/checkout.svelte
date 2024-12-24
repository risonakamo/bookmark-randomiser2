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
</script>

<style lang="sass">
    @use "./checkout.sass"
</style>

<div class="checkout">
    <div class="items">
        {#each selectedItems as item (item.id)}
            <div class="checkout-item">
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