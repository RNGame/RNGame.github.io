import p5 from "p5";
export declare class Player {
    constructor(gamesize: number, image: p5.Image);
    private playerimage;
    private oldAngle;
    private playerscale;
    playersize: number;
    draw(p: p5): void;
    private pointer;
    private pointerRotation;
    private playerShape;
}
