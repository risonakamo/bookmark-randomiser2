<script lang="ts">
import {onMount} from "svelte";

onMount(()=>{
    chrome.tabs.create({
        active:true,
        url:"/build/session-select.html",
    });
});
</script>