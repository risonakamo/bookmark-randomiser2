<script lang="ts">
var {
    // current path in the bookmark folder tree
    path=[],

    // items of the current folder tree path
    items=[]
}:{
    path:BookmarkPath
    items:BookmarkItem[]
}=$props();
</script>

<style lang="sass">
    @use "./bookmark-browser.sass"
</style>

<div class="bookmark-browser">
    <div class="path">
        /
        <div class="path-item"><a href="">thing</a></div>
        /
        <div class="path-item"><a href="">other thing</a></div>
    </div>
    <div class="folders">
        <div class="folder">
            <a href="">..</a>
        </div>

        {#each items as item (item.id)}
            <div class="folder">
                <input type="checkbox"/>
                <a href="">{item.title}</a>
            </div>
        {/each}
    </div>
</div>