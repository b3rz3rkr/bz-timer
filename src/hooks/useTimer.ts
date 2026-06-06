import { useEffect, useMemo, useState } from 'react';

interface Time {
    min: number;
    sec: number;
}

const pad = (n: number, len = 2) => String(n).padStart(len, '0');

const transformTime = (ms: number): string => {
    const d = new Date(ms);
    const cs = Math.floor(d.getUTCMilliseconds() / 10);
    return [
        pad(d.getUTCHours()),
        pad(d.getUTCMinutes()),
        pad(d.getUTCSeconds()),
        pad(cs)
    ].join(':');
};

const useTimer = () => {
    const [started, setStarted] = useState<number>();
    const [timer, setTimer] = useState<Time>({ min: 0, sec: 0 });
    const [elapsed, setElapsed] = useState<number>(0);

    const timerMs = useMemo(() => (timer.min * 60 + timer.sec) * 1000, [timer]);

    useEffect(() => {
        if (!started) return;

        let frameId: number;

        const tick = () => {
            const newElapsed = performance.now() - started;
            if (newElapsed >= timerMs) {
                setStarted(undefined);
                setElapsed(timerMs);
                return;
            }
            setElapsed(newElapsed);
            frameId = requestAnimationFrame(tick);
        };

        frameId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameId);
    }, [started, timerMs]);

    const startTimer = () => {
        setStarted(performance.now());
    };

    const resetTimer = () => {
        setStarted(undefined);
        setElapsed(0);
    };

    const pauseTimer = () => {
        setStarted(undefined);
    };

    const resumeTimer = () => {
        setStarted(performance.now() - elapsed);
    };

    return {
        startTimer,
        setTimer,
        resetTimer,
        pauseTimer,
        resumeTimer,
        time: transformTime(elapsed),
        timer,
        started
    };
};

export default useTimer;
