import * as R from 'ramda';

import { Key, DIRECTIONS, isOppositeDirection } from './directions';
import { Point } from './point';
import { State, initialState, nextState } from './state';

const setColor = (ctx: CanvasRenderingContext2D, color: string): void => {
    ctx.fillStyle = color;
}

const drawPoint = (ctx: CanvasRenderingContext2D, {x, y}: Point, {tileSize}: State["grid"]) => {
    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
};

const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, { fruitColor, snakeColor, fruit, snake, grid }: State ) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setColor(ctx, fruitColor);
    drawPoint(ctx, fruit, grid);
    
    setColor(ctx, snakeColor);
    snake.forEach((point: Point) => drawPoint(ctx, point, grid));
};

const setDirection = (key: Key | undefined) => (state: State) => key && !isOppositeDirection(state.move, DIRECTIONS[key]) ? ({
    ...state,
    move: DIRECTIONS[key],
}) : state;


let state: State = R.clone(initialState);

const canvas: HTMLCanvasElement = document.createElement("canvas");
canvas.width = state.grid.width * state.grid.tileSize;
canvas.height = state.grid.height * state.grid.tileSize;

document.body.insertBefore(canvas, document.body.firstChild);

const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

if (ctx == null) {
    throw new Error("Context is missing!");
}

setInterval(() => {
    draw(ctx, canvas, state);
    state = nextState(state);
}, 50);

document.addEventListener("keydown", ({key: keyName}: KeyboardEvent) => {
    const direction: Key | undefined = Key[keyName as keyof typeof Key];
    state = setDirection(direction)(state);
})
