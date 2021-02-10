import p5 from "p5";
export declare class Impact {
    constructor(x: number, y: number, width: number);
    posX: number;
    posY: number;
    width: number;
    counter: number;
    stateFinished: boolean;
    draw(p: p5): void;
}
