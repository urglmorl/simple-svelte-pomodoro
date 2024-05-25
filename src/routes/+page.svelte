<script lang="ts">
    import Counter from './Counter.svelte';
    import Cycle from "./Cycle.svelte";
    import type {ICycle} from "./cycle.model";

    let workTime: number = 25;
    let restTime: number = 5;
    let bigRestTime: number = restTime * 3;
    let cycleQuantity: number = 4;

    let currentCycle: number = 0;
    let cycles: ICycle[] = [];

    function generateCycles(quantity: number) {
        return [...new Array(quantity)].map((_, index) => {
            if ((index + 1) % 4 === 0) {
                return {index, workTime, restTime: bigRestTime};
            } else {
                return {index, workTime, restTime};
            }
        });
    }

    function start() {
        cycles = generateCycles(cycleQuantity);
    }

    function onCycleDone() {
        if (currentCycle + 1 === cycles.length) {
            stop();
            return;
        }
        currentCycle++;
    }

    function stop() {
        cycles = [];
        currentCycle = 0;
    }
</script>

<svelte:head>
    <title>Pomodoro timer</title>
    <meta name="description" content="Pomodoro simple timer"/>
</svelte:head>

<section>
    <div>
        <div class="block">
            <h2>Time to work</h2>
            <Counter min={15} initial={workTime} on:timeupdate={({detail}) => workTime = detail}/>
        </div>
        <div class="block">
            <h2>Time to small rest</h2>
            <Counter min={5} initial={restTime} on:timeupdate={({detail}) => restTime = detail}/>
        </div>
        <div class="block">
            <h2>Time to big rest</h2>
            <Counter min={10} initial={bigRestTime} on:timeupdate={({detail}) => bigRestTime = detail}/>
        </div>
        <div class="block">
            <h2>How much cycles?</h2>
            <Counter step={1} min={1} initial={cycleQuantity} on:timeupdate={({detail}) => cycleQuantity = detail}/>
        </div>
    </div>
    <div>
        {#if (!cycles.length)}
            <button on:click={() => start()}>
                <span>
                    Start
                </span>
            </button>
        {:else}
            <button on:click={() => stop()}>
                <span>
                    Stop
                </span>
            </button>
        {/if}
    </div>

    <section>
        {#if (cycles[currentCycle])}
            <Cycle cycle={cycles[currentCycle]} on:done={() => onCycleDone()}></Cycle>
        {/if}
    </section>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-grow: 1;
        height: 100%;
        width: 100%;
    }

    section > section {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: center;
        align-items: center;
    }

    section > div > button {
        width: 50vw;
        padding: .5rem 1rem;
        border-radius: .3rem;
        border: none;
        color: var(--color-theme-1);
    }

    section > div > button > span {
        display: inline-block;
        font-size: 1rem;
        margin: .8rem 0;
        font-weight: 400;
    }

    section > div {
        max-height: 60%;
        display: flex;
        flex-direction: row;
    }

    section > div:first-child {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .block {
        width: 100%;
        text-align: center;
    }
</style>
