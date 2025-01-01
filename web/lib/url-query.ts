// page url queries

/** get args for randomiser page */
export function randomiserUrlArgs():RandomiserPageArgs
{
    const params=new URLSearchParams(location.search);

    return {
        sessionId:params.get("sessionId") || undefined
    };
}

/** create url to go to randomiser page with session id */
export function createRandomiserUrl(sessionId:string):string
{
    const params=new URLSearchParams({
        sessionId,
    } satisfies RandomiserPageArgs);

    return `/build/randomiser.html?${params}`;
}