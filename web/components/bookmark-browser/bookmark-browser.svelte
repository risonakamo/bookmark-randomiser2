<script lang="ts">
var {
    // current path in the bookmark folder tree
    path=$bindable(),

    // items of the current folder tree path
    items=[]
}:{
    path:BookmarkPath
    items:BookmarkItem[]
}=$props();

/** clicked on a folder. append the folder to the path. curried */
function h_folderClick(item:BookmarkItem)
{
    return (e:MouseEvent):void=>{
        e.preventDefault();

        path=[...path,item.title]
        console.log("new path",path);
    };
}

/** clicked upwards button. pop off the path */
function h_upwardsClick(e:MouseEvent):void
{
    e.preventDefault();
    path.pop();
    path=path;
}
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
            <a href="" onclick={h_upwardsClick}>..</a>
        </div>

        {#each items as item (item.id)}
            <div class="folder">
                <input type="checkbox"/>
                <a href="" onclick={h_folderClick(item)}>{item.title}</a>
            </div>
        {/each}
    </div>
</div>