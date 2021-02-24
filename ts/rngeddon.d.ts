import p5 from "p5";
import { GameControllerInterface } from "./gamecontroller_interface";
export declare class RNGeddonController implements GameControllerInterface {
    constructor();
    private gameinstance;
    private earthSize;
    private markersize;
    private maxEarthLife;
    private life;
    private isSimulation;
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
    private updateLife;
    private endGame;
    private reset;
    private sketch;
    game(): (p: p5) => void;
}
