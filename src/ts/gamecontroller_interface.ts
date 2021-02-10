import p5 from "p5";

export interface GameControllerInterface {
    game(): (p: p5) => void
}