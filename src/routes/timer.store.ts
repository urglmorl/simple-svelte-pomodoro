import {get, writable} from "svelte/store";

function timer(secs: number) {
    const s = writable(secs);
    const {subscribe, set} = s;

    function start() {
        const stop = () => {
            clearInterval(interval);
        }
        const interval = setInterval(() => {
            const value = get(s);
            if (value <= 0) {
                stop();
            } else {
                set(value - 1);
            }
        }, 1000);
    }

    start();
    
    return {
        subscribe,
    };
}

export default timer;