// typings for bookmark lib

type BookmarkPath=string[]

/** abstracted bookmark item. represents a folder that can be randomised upon */
interface BookmarkItem
{
    title:string
    id:string

    // number of folders in the bookmark item
    dirs:number

    // number of real bookmarks in this bookmark item
    items:number
}

/** abstracted actual bookmark item. represents a bookmark itself that is NOT a folder */
interface RealBookmarkItem
{
    title:string

    // chrome bookmark id
    id:string

    // webpage url content of the bookmark (NOT path to the item)
    url:string
}