// funcs for interacting with storage

import _ from "lodash";

import {getTimestamp} from "@/lib/util";

/** add a session to the storage */
export async function addSession(session:RandomisationSession):Promise<void>
{
    const gotStorage:Storage=await chrome.storage.local.get<Storage>("sessions");
    var sessions:RandomisationSession[]=gotStorage.sessions || [];

    sessions.push(session);

    gotStorage.sessions=sessions;

    chrome.storage.local.set(gotStorage);
}

/** get the current sessions */
export async function getSessions():Promise<RandomisationSession[]>
{
    const gotStorage:Storage=await chrome.storage.local.get<Storage>("sessions");
    return gotStorage.sessions || [];
}

/** try to get from storage a certain session */
export async function getSession(id:string):Promise<RandomisationSession|undefined>
{
    const sessions:RandomisationSession[]=await getSessions();

    return _.find(sessions,(session:RandomisationSession):boolean=>{
        return session.id==id;
    });
}

/** update a session's position, and other fields automatically. returns the updated session */
export async function updateSession(id:string,position:number):Promise<RandomisationSession|undefined>
{
    const gotStorage:Storage=await chrome.storage.local.get<Storage>("sessions");
    var sessions:RandomisationSession[]=gotStorage.sessions || [];

    const foundSession:RandomisationSession|undefined=_.find(sessions,(session:RandomisationSession):boolean=>{
        return session.id==id;
    });

    if (!foundSession)
    {
        console.error("failed to find session to update:",id);
        return;
    }

    foundSession.position=position;
    foundSession.lastUpdateDate=getTimestamp();

    chrome.storage.local.set(gotStorage);

    return foundSession;
}