import type { Time } from '../types';

const timeToMs = (time: Time) =>
    ((time.hours * 60 + time.min) * 60 + time.sec) * 1000;

export default timeToMs;
