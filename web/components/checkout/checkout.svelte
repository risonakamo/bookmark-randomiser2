<script lang="ts">
var {
    selectedItems=$bindable([])
}:{
    selectedItems:BookmarkItem[]
}=$props();
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
            <p class="count">1233</p>
        </div>

        <div class="submit-button">
            <a href="">submit</a>
        </div>
    </div>
</div>