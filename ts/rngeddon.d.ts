import p5 from "p5";
import { GameControllerInterface } from "./gamecontroller_interface";
export declare class RNGeddonController implements GameControllerInterface {
    private meteorsPerSecond;
    private framesPerSecond;
    private earthSize;
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
    private testProbability;
    private addToScore;
    private removeMeteor;
    private sketch;
    game(): (p: p5) => void;
}
