import p5 from "p5";
import { Impact } from "./impact";
import { Starlist } from "./star";
import { Direction } from "./marker";
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
    direction: Direction;
    meteorSize: number;
    earthsSize: number;
    playerSize: number;
    stateImpact: boolean;
    stateEaten: boolean;
    speedFactor: number;
    sizeFactor: number;
    image: p5.Image;
    private eckangle;
    draw(p: p5): void;
    private checkImpact;
    private checkNom;
    private sanitize_angle;
    private line_intersection;
    private calcute_entrypoint;
}
export declare class Meteorlist {
    constructor(explosionImage: p5.Image);
    meteors: Meteor[];
    impacts: Impact[];
    stars: Starlist;
    meteorseaten: number;
    explosionImage: p5.Image;
    draw(p: p5): void;
    push(meteor: Meteor): void;
    private removeMeteor;
}
