import p5 from "p5";
import { GameControllerInterface } from "./gamecontroller_interface";
export declare class RNGeddonController implements GameControllerInterface {
    constructor();
    private earthSize;
    private markersize;
    private meteorsPerSecond;
    private framesPerSecond;
    private earth;
    private player;
    private meteors;
    private markers;
    private markercolor;
    private explosionImage;
    private meteorImage;
    private playerImage;
    private meteorAngleProbability;
    private meteorSpeedProbability;
    private updateScore;
    private reset;
    private sketch;
    game(): (p: p5) => void;
}
