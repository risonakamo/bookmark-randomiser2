import {mount} from "svelte";
import SessionSelect from "./session-select.svelte";

window.onload=()=>{
    mount(SessionSelect,{target:document.body});
};