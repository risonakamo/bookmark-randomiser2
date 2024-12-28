// funcs for interacting with storage

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