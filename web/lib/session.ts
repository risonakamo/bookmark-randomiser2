// funcs for working with session related data

import {getTimestamp} from "./util";

/** create a session. items is the actual bookmark items of the session, dirs is the
 *  bookmark folders used to choose the items */
export function createSession(
    items:RealBookmarkItem[],
    dirs:BookmarkItem[],
):RandomisationSession
{
    return {
        id:window.crypto.randomUUID().slice(0,15),

        items,

        position:0,

        createdDate:getTimestamp(),
        lastUpdateDate:getTimestamp(),

        originDirs:dirs,
    };
}