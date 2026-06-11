interface Range {
    min: number;
    max: number;
}
const inRange = (value: number, { min, max }: Range) =>
    (isNaN(min) || value >= min) && (isNaN(max) || value <= max);

export default inRange;
