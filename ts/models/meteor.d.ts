import p5 from "p5";
export declare class Meteor {
    constructor(rng_values: {
        angle?: number;
        speed?: number;
        size?: number;
    }, width: number, //width of the screen
    height: number, //height of the screen
    earthsize: number, playersize: number, image: p5.Image);
    posX: number;
    posY: number;
    earthX: number;
    earthY: number;
    distX: number;
    distY: number;
    meteorSize: number;
    earthsSize: number;
    playerSize: number;
    stateImpact: boolean;
    stateEaten: boolean;
    speedFactor: number;
    image: p5.Image;
    private eckangle;
    draw(p: p5): void;
    private checkImpact;
    private checkNom;
    private line_intersection;
    private calcute_entrypoint;
}
