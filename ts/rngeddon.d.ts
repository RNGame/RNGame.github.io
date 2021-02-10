import p5 from "p5";
export declare class RNGeddonController {
    private oldAngle;
    private gamesize;
    private earthSize;
    private meteorsPerSecond;
    private framesPerSecond;
    private earth;
    private player;
    private meteors;
    private stars;
    private impacts;
    private eckangle;
    private score;
    private uniformProb;
    private addToScore;
    private removeMeteor;
    private sketch;
    game(): (p: p5) => void;
}
