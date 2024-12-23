import {mount} from "svelte";
import SessionCreate from "./session-create.svelte";

window.onload=()=>{
    mount(SessionCreate,{target:document.body});
};