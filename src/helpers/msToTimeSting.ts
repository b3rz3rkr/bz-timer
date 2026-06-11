import pad from './pad';

// Valid until ms less than 31 days
const msToTimeSting = (ms: number): string => {
    const d = new Date(ms);
    const cs = Math.floor(d.getUTCMilliseconds() / 10);
    return [
        pad(d.getUTCHours() + (d.getUTCDate() - 1) * 24),
        pad(d.getUTCMinutes()),
        pad(d.getUTCSeconds()),
        pad(cs)
    ].join(':');
};

export default msToTimeSting;
