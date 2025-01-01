// funcs for interacting with storage

import _ from "lodash";

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