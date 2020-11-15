export const random = (range: number): number => Math.floor(Math.random() * range);

export const inverse = (x: number): number => x === 0 ? 0 : x * -1;

export const edge = (value: number, range: number): number => value < 0 ? range : value % range;
