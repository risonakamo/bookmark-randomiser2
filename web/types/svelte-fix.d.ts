/** fix input event because it has no named type */
interface SvelteInputEvent
{
    currentTarget:HTMLInputElement
}