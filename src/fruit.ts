import { Sprite, loadSprite } from './sprite';

import fruitSpriteUrl from './fruit.png';

export const loadFruitSprite: () => Promise<Sprite> = (): Promise<Sprite> => loadSprite(fruitSpriteUrl);
