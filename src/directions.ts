import * as R from 'ramda';

import { invertPoint, Point, point } from "./point";

export enum Key {
    ArrowLeft = "ArrowLeft",
    ArrowUp = "ArrowUp",
    ArrowRight = "ArrowRight",
    ArrowDown = "ArrowDown",
}

export const DIRECTIONS: Record<Key, Point> = {
    [Key.ArrowLeft]: point(-1, 0),
    [Key.ArrowUp]: point(0, -1),
    [Key.ArrowRight]: point(1, 0),
    [Key.ArrowDown]: point(0, 1),
}

export const isOppositeDirection = (dirOne: Point, dirTwo: Point): boolean => R.equals(dirOne, invertPoint(dirTwo));
