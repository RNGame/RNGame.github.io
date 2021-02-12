import p5 from "p5";
export declare class Star {
    constructor(x: number, y: number, sizescale: number);
    posX: number;
    posY: number;
    size: number;
    counter: number;
    countup: boolean;
    animationlength: number;
    opacity: number;
    draw(p: p5): void;
}
export declare class Starlist {
    constructor();
    stars: Star[];
    maxstars: number;
    push(star: Star): void;
    draw(p: p5): void;
}
