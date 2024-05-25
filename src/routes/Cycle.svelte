<script lang="ts">
    import Timer from "./Timer.svelte";
    import {createEventDispatcher} from "svelte";
    import type {ICycle} from "./cycle.model";

    const dispatch = createEventDispatcher();

    export let cycle: ICycle;

    $: if(cycle) state = 'work';

    let state: 'work' | 'rest' = 'work';

    function toggleState() {
        if (state === 'work') {
            state = 'rest';
        } else if (state === 'rest') {
            dispatch('done');
        }
    }
</script>

{#if (state === 'work')}
    <div>
        <h1>It's time to work!!</h1>
        <Timer on:done={() => toggleState()} seconds={cycle.workTime * 60}/>
    </div>
{:else if (state === 'rest')}
    <div>
        <h1>Rest time - take it easy</h1>
        <Timer on:done={() => toggleState()} seconds={cycle.restTime * 60}/>
    </div>
{/if}
