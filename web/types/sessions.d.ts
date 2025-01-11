// types related to randomisation session objs

/** data representing a randomisation session */
interface RandomisationSession
{
    id:string
    title:string

    items:RealBookmarkItem[]

    // index of last consumed items
    position:number

    createdDate:string
    lastUpdateDate:string

    // bookmark folders used to create this session
    originDirs:BookmarkItem[]
}