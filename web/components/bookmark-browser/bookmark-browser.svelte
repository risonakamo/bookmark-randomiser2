<script lang="ts">
import _ from "lodash";

import {expandPathToMiniPaths} from "@/lib/bookmark";

var {
    // current path in the bookmark folder tree
    path=$bindable([]),

    // items of the current folder tree path
    items=[],

    selectedItems=$bindable([]),
}:{
    path:BookmarkPath
    items:BookmarkItem[]
    selectedItems:BookmarkPath[]
}=$props();

/** subpaths for all the bookmark items */
var subPaths:BookmarkPath[]=$derived(expandPathToMiniPaths(path));

$effect(()=>{
    console.log("selected",selectedItems);
});

/** compute sub path for a single bookmark item by adding the item to the
 *  current path */
 function computeItemPath(item:string):BookmarkPath
{
    return [...path,item];
}

/** check if a bookmark subpath is a selected path */
function subPathIsSelected(subPath:BookmarkPath):boolean
{
    return _.some(selectedItems,(item:BookmarkItem):boolean=>{
        return _.isEqual(item,subPath);
    });
}

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

/** a bookmark item's path was selected or deselected. perform the corresponding
 *  action with the selected items array */
function h_bookmarkPathSelected(targetPath:BookmarkPath)
{
    return (e:SvelteInputEvent):void=>{
        console.log("selecting",targetPath);
        console.log("new val",e.currentTarget.checked);
        if (!e.currentTarget.checked)
        {
            selectedItems=_.filter(selectedItems,(item:BookmarkPath):boolean=>{
                return _.isEqual(item,targetPath);
            });
            console.log("removal",selectedItems);
        }

        else
        {
            selectedItems=[...selectedItems,targetPath];
        }
    };
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
            {@const itemsPath:BookmarkPath=computeItemPath(item.title)}
            {@const isSelected:boolean=subPathIsSelected(itemsPath)}
            <div class="folder">
                <input type="checkbox" onchange={h_bookmarkPathSelected(itemsPath)}
                    checked={isSelected}/>
                <a href="" onclick={h_folderClick(item)}>{item.title}</a>
            </div>
        {/each}
    </div>
</div>