<script lang="ts">
import {expandPathToMiniPaths} from "@/lib/bookmark";

var {
    // current path in the bookmark folder tree
    path=$bindable(),

    // items of the current folder tree path
    items=[]
}:{
    path:BookmarkPath
    items:BookmarkItem[]
}=$props();

/** subpaths for all the bookmark items */
var subPaths:BookmarkPath[]=$derived(expandPathToMiniPaths(path));

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

/** clicked on a path item. change to the target path */
function h_clickPath(targetPath:BookmarkPath)
{
    return (e:MouseEvent):void=>{
        e.preventDefault();
        path=targetPath;
    };
}

/** clicked button to go to top level of bookmarks. reset path to
 *  empty */
function h_clickTop(e:MouseEvent):void
{
    e.preventDefault();
    path=[];
}
</script>

<style lang="sass">
    @use "./bookmark-browser.sass"
</style>

<div class="bookmark-browser">
    <div class="path">
        <div class="path-item">
            <a href="" onclick={h_clickTop}>top</a>
        </div>

        {#each path as pathItem,pathItemI (pathItem)}
            <div class="path-item">
                <span>/</span>
                <input type="checkbox"/>
                <a href="" onclick={h_clickPath(subPaths[pathItemI])}>
                    {pathItem}
                </a>
            </div>
        {/each}
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