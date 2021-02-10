import p5 from "p5";
export declare class Player {
    constructor(gamesize: number);
    gamesize: number;
    oldAngle: number;
    draw(p: p5): void;
    private pointer;
    private pointerRotation;
    private playerShape;
}
