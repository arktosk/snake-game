import * as R from "ramda";

import { DIRECTIONS } from "./directions";
import { edge } from "./math";
import { Point, point, randomPointOnEmptyField } from "./point";
import { Sprite } from "./sprite";

export interface State {
    grid: {
        width: number;
        height: number;
        tileSize: number;
    };
    snake: Point[];
    snakeColor: string;
    snakeLength: number;
    fruit: Point;
    fruitColor: string;
    fruitSprite: Sprite | null;
    move: Point;
}

export const initialState: State = {
    grid: {
        width: 25,
        height: 25,
        tileSize: 25,
    },
    snake: [point(5, 5)],
    snakeColor: "#5ea345",
    snakeLength: 5,
    fruit: point(10, 5),
    fruitColor: "#f21616",
    fruitSprite: null,
    move: DIRECTIONS.ArrowLeft,
}

export const initializeStateWith = (stateOverrides: Partial<State>): Promise<State> => Promise.resolve({...initialState, ...stateOverrides});

const nextStep = ({ snake, move, grid }: State): Point => point(
    edge((R.last(snake) as Point).x + move.x, grid.width),
    edge((R.last(snake) as Point).y + move.y, grid.height),
);

const setTail = ({ snake, snakeLength}: State) => R.drop(Math.abs(snake.length > snakeLength ? snake.length - snakeLength : 0), snake);

const nextSnake = (state: State): State => 
    R.find(R.equals(nextStep(state)))(state.snake) ? {
        ...state,
        snake: [point(5, 5)],
        snakeLength: 5,
    } : {
        ...state,
        snake: [...setTail(state), nextStep(state)],
    }

const nextFruit = (state: State): State =>
    R.equals(nextStep(state), state.fruit) ? {
        ...state,
        fruit: randomPointOnEmptyField(state.grid, state.snake),
        snakeLength: state.snakeLength + 1,
    } : state;

export const nextState = (state: State): State => {
    return R.pipe(nextFruit, nextSnake)(state);
}
