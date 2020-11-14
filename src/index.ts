import * as R from 'ramda';
interface Point {
    x: number,
    y: number,
}

const point = (x: number, y: number): Point => ({x, y});

enum Key {
    ArrowLeft = "ArrowLeft",
    ArrowUp = "ArrowUp",
    ArrowRight = "ArrowRight",
    ArrowDown = "ArrowDown",
}

const DIRECTIONS: Record<Key, Point> = {
    [Key.ArrowLeft]: point(-1, 0),
    [Key.ArrowUp]: point(0, -1),
    [Key.ArrowRight]: point(1, 0),
    [Key.ArrowDown]: point(0, 1),
}

interface State {
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
    move: Point;
}

const initialState: State = {
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
    move: DIRECTIONS.ArrowLeft,
}

let state: State = R.clone(initialState);

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

const random = (range: number): number => Math.floor(Math.random() * range);

const edge = (value: number, range: number) => value < 0 ? range : value % range;

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
        fruit: point(random(state.grid.width), random(state.grid.width)),
        snakeLength: state.snakeLength + 1,
    } : state;

const nextState = (state: State): State => {
    return R.pipe(nextFruit, nextSnake)(state);
}

const setDirection = (key: Key | undefined) => (state: State) => key ? ({
    ...state,
    move: DIRECTIONS[key],
}) : state;

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
