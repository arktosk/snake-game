export type Sprite = HTMLCanvasElement;

export const loadSprite = (spriteSrc: string): Promise<Sprite> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.src = spriteSrc;

        image.addEventListener("load", () => {
            const {naturalHeight, naturalWidth} = image;
            const buffer = document.createElement('canvas');
            buffer.width = naturalHeight;
            buffer.height = naturalWidth;    
            
            const bufferContext = buffer.getContext('2d');

            bufferContext?.drawImage(
                image,
                0,
                0,
                naturalHeight,
                naturalWidth,
            );
        
            resolve(buffer);
        });
        image.addEventListener("error", reject);
    });
