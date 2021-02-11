import p5 from "p5";
import { GameControllerInterface } from "./gamecontroller_interface";
export declare class RNGeddonController implements GameControllerInterface {
    constructor();
    private earthSize;
    private meteorsPerSecond;
    private framesPerSecond;
    private earth;
    private player;
    private meteors;
    private markers;
    private stars;
    private impacts;
    private explosionImage;
    private meteorImage;
    private playerImage;
    private score;
    private angleData;
    private testProbability;
    private addToScore;
    private removeMeteor;
    private sketch;
    private plotDistribution;
    game(): (p: p5) => void;
}
