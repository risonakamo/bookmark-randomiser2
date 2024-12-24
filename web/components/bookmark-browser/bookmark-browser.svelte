<script lang="ts">
import _ from "lodash";

import {pruneBookmarkItemsPathUpToItem} from "@/lib/bookmark";

var {
    // current path in the bookmark folder tree
    path=$bindable([]),

    // items of the current folder tree path
    items=[],

    selectedItems=$bindable([]),
}:{
    path:BookmarkItem[]
    items:BookmarkItem[]
    selectedItems:BookmarkItem[]
}=$props();

/** check if an item is in the selected items */
function itemIsSelected(targetItem:BookmarkItem):boolean
{
    return _.some(selectedItems,(item:BookmarkItem):boolean=>{
        return item.id==targetItem.id;
    });
}

/** clicked on a folder. append the folder to the path. curried */
function h_folderClick(item:BookmarkItem)
{
    return (e:MouseEvent):void=>{
        e.preventDefault();

        path=[...path,item];
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
function h_clickPath(targetItem:BookmarkItem)
{
    return (e:MouseEvent):void=>{
        e.preventDefault();
        path=pruneBookmarkItemsPathUpToItem(
            path,
            targetItem,
        );
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
function h_bookmarkItemSelected(targetItem:BookmarkItem)
{
    return (e:SvelteInputEvent):void=>{
        if (!e.currentTarget.checked)
        {
            selectedItems=_.reject(selectedItems,(item:BookmarkItem):boolean=>{
                return item.id==targetItem.id;
            });
        }

        else
        {
            selectedItems=[...selectedItems,targetItem];
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

        {#each path as pathItem (pathItem.id)}
            <div class="path-item">
                <span>/</span>
                <input type="checkbox"/>
                <a href="" onclick={h_clickPath(pathItem)}>
                    {pathItem.title}
                </a>
            </div>
        {/each}
    </div>
    <div class="folders">
        <div class="folder">
            <a href="" onclick={h_upwardsClick}>..</a>
        </div>

        {#each items as item (item.id)}
            {@const isSelected:boolean=itemIsSelected(item)}
            <div class="folder">
                <input type="checkbox" onchange={h_bookmarkItemSelected(item)}
                    checked={isSelected}/>
                <a href="" onclick={h_folderClick(item)}>{item.title}</a>
            </div>
        {/each}
    </div>
</div>