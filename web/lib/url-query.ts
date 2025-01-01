// page url queries

/** get args for randomiser page */
export function randomiserUrlArgs():RandomiserPageArgs
{
    const params=new URLSearchParams(location.search);

    return {
        sessionId:params.get("sessionId") || undefined
    };
}