<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import timer from "./timer.store";

    const dispatch = createEventDispatcher();

    export let seconds: number = 0;

    $: t = timer(seconds);
    $: $t === 0 && dispatch('done');

    const pad = (value: number) => ('00' + value).slice(-2);

    function format(value: number) {
        const minutes: number = Math.floor((value % 3600) / 60);
        const seconds: number = Math.floor(value - minutes * 60);
        return `${pad(minutes)}` + ':' + `${pad(seconds)}`;
    }
</script>

<h1>{format($t)}</h1>