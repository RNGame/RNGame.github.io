import p5 from "p5";
export declare class Impact {
    constructor(x: number, y: number, width: number, image: p5.Image);
    posX: number;
    posY: number;
    width: number;
    counter: number;
    stateFinished: boolean;
    explosionImage: p5.Image;
    maxWidth: number;
    scale: number;
    animationLength: number;
    draw(p: p5): void;
}
