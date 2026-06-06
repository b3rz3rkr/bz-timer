import useTimer from '../hooks/useTimer.ts';

const Timer = () => {
    const {
        startTimer,
        started,
        setTimer,
        resumeTimer,
        resetTimer,
        pauseTimer,
        time
    } = useTimer();
    const submitForm = (formData: FormData) => {
        const timer = {
            min: parseInt(formData.get('min') || 0),
            sec: parseInt(formData.get('sec') || 0)
        };
        setTimer(timer);
        startTimer();
    };
    return (
        <form className={'timer'} action={submitForm}>
            <div className={'time'}>{time}</div>
            <div className={'timer-input'}>
                <input
                    type={'number'}
                    name={'min'}
                    placeholder={'00'}
                    min={0}
                />
                <input
                    type={'number'}
                    name={'sec'}
                    placeholder={'00'}
                    min={0}
                    max={59}
                />
            </div>
            <div className={'timer-buttons'}>
                <button className={'timer-button'} type={'submit'}>
                    start
                </button>
                <button
                    className={'timer-button'}
                    onClick={started ? pauseTimer : resumeTimer}
                    type={'button'}
                >
                    {started ? 'pause' : 'resume'}
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
