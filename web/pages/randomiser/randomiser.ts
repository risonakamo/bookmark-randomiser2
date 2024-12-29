import {mount} from "svelte";
import Randomiser from "./randomiser.svelte";

window.onload=()=>{
    mount(Randomiser,{target:document.body});
};