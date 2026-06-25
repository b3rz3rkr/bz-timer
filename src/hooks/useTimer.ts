import { useEffect, useEffectEvent, useMemo, useState } from 'react';
import { timeToMs, msToTimeSting, isSameSecond } from '../helpers';
import type { Time } from '../types';

interface Props {
    onFinish?: () => void;
}

const initTime: Time = { hours: 0, min: 0, sec: 0 };

const useTimer = (props?: Props) => {
    const [started, setStarted] = useState<number>();
    const [timer, setTimer] = useState<Time>(initTime);
    const [elapsed, setElapsed] = useState<number>(0);

    const timerMs = useMemo(() => timeToMs(timer), [timer]);

    const onFinish = useEffectEvent(() => {
        props?.onFinish?.();
    });

    useEffect(() => {
        if (!started) return;

        let frameId: number;

        const tick = () => {
            const newElapsed = performance.now() - started;
            if (newElapsed >= timerMs) {
                setStarted(undefined);
                const same = isSameSecond(newElapsed, timerMs);
                setElapsed(same ? timerMs : newElapsed);
                onFinish();
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
        setElapsed(0);
    };

    const resetTimer = () => {
        setStarted(undefined);
        setTimer(initTime);
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
        elapsed,
        elapsedTimeString: msToTimeSting(elapsed),
        timer,
        started
    };
};

export default useTimer;
