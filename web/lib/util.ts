// random util funcs

/** make a timestamp in certain format */
export function getTimestamp():string
{
    const now: Date =new Date();
    const year: number = now.getFullYear();
    const month: string = (now.getMonth() + 1).toString().padStart(2, "0");
    const day: string = now.getDate().toString().padStart(2, "0");
    const hours: string = now.getHours().toString().padStart(2, "0");
    const minutes: string = now.getMinutes().toString().padStart(2, "0");
    const seconds: string = now.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}