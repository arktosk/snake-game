import * as R from "ramda";

import { inverse, random } from "./math";

export interface Point {
    x: number,
    y: number,
}

export const point = (x: number, y: number): Point => ({x, y});

export const invertPoint = (point: Point): Point => R.map(inverse, point);

const randomPoint = ({width, height}: {width: number; height: number}): Point => point(random(width), random(height))

/** Checks if given point is same as given array of points. */
const isEmptyField = (occupiedFields: Point[]) => (nextPoint: Point): boolean => R.compose(R.not, R.any(R.equals(nextPoint)))(occupiedFields);

export const randomPointOnEmptyField = (grid: {width: number; height: number}, reservedFields: Point[]): Point => R.until(isEmptyField(reservedFields), () => randomPoint(grid))(randomPoint(grid));
