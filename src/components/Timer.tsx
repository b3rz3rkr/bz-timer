import { useTimer } from '../hooks';
import type { ChangeEvent } from 'react';
import { pad, timeToMs, msToTimeSting, inRange } from '../helpers';

const onTimerEnd = () => {
    console.log('💣 💥 B0000M!');
};

const MAX_HOURS = 31 * 24 - 1;

const Timer = () => {
    const {
        startTimer,
        started,
        setTimer,
        resumeTimer,
        resetTimer,
        pauseTimer,
        elapsed,
        elapsedTimeString,
        timer
    } = useTimer({ onFinish: onTimerEnd });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { target } = e;
        const { name, min, max, value } = target;
        const numVal = Number(value);
        const range = {
            min: Number(min),
            max: Number(max)
        };

        if (!isNaN(numVal) && inRange(numVal, range)) {
            const newTimer = {
                ...timer,
                [name]: numVal
            };
            setTimer(newTimer);
        }
    };

    return (
        <form className={'timer'}>
            <div className={'time'}>{elapsedTimeString}</div>
            <div>
                <div className={'target-time'}>
                    {msToTimeSting(timeToMs(timer))}
                </div>
                <div className={'target-time placeholder'}>hh:mm:ss:cs</div>
            </div>
            <div className={'timer-input'}>
                <label>
                    <input
                        type={'number'}
                        inputMode={'numeric'}
                        name={'hours'}
                        min={0}
                        max={MAX_HOURS}
                        value={pad(timer.hours)}
                        onChange={handleChange}
                    />
                    h
                </label>
                :
                <label>
                    <input
                        type={'number'}
                        inputMode={'numeric'}
                        name={'min'}
                        min={0}
                        max={59}
                        value={pad(timer.min)}
                        onChange={handleChange}
                    />
                    m
                </label>
                :
                <label>
                    <input
                        type={'number'}
                        inputMode={'numeric'}
                        name={'sec'}
                        min={0}
                        max={59}
                        value={pad(timer.sec)}
                        onChange={handleChange}
                    />
                    s
                </label>
            </div>
            <div className={'timer-buttons'}>
                <button
                    className={'timer-button'}
                    type={'button'}
                    onClick={startTimer}
                    disabled={timeToMs(timer) === 0}
                >
                    {started || elapsed ? 'restart' : 'start'}
                </button>
                <button
                    className={'timer-button'}
                    onClick={started ? pauseTimer : resumeTimer}
                    type={'button'}
                    disabled={!elapsed}
                >
                    {started || !elapsed ? 'pause' : 'resume'}
                </button>
                <button
                    className={'timer-button'}
                    onClick={resetTimer}
                    type={'button'}
                >
                    reset
                </button>
            </div>
        </form>
    );
};

export default Timer;
