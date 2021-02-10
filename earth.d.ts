import p5 from "p5";
export declare class Earth {
    earthImage: p5.Image;
    earthRotation: number;
    private earthSize;
    constructor(earthSize: number);
    draw(p: p5): void;
}
