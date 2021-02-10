import p5 from "p5";
export declare class Meteor {
    constructor(radius: number, angle: number, width: number, height: number, earthsize: number, playersize: number);
    startX: number;
    startY: number;
    posX: number;
    posY: number;
    earthX: number;
    earthY: number;
    meteorSize: number;
    earthsSize: number;
    playerSize: number;
    stateImpact: boolean;
    stateEaten: boolean;
    factor: number;
    draw(p: p5): void;
    private checkImpact;
    private checkNom;
}
