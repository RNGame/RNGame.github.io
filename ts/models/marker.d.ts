import p5 from "p5";
export declare const enum Direction {
    North = 0,
    South = 1,
    East = 2,
    West = 3
}
declare const enum Alignment {
    Vertical = 0,
    Horizontal = 1
}
export declare class Marker {
    constructor(x: number, y: number, size: number, direction: Direction);
    posX: number;
    posY: number;
    size: number;
    direction: Direction;
    alignment: Alignment;
    edge_large: number;
    edge_small: number;
    draw(p: p5, color: p5.Color): void;
    private rectanglemarker;
    private gradientbox;
}
export declare class Markerlist {
    constructor(color: p5.Color);
    north: Marker[];
    south: Marker[];
    east: Marker[];
    west: Marker[];
    secondarymarkers: SecondaryMarkerlist;
    color: p5.Color;
    draw(p: p5): void;
    push(marker: Marker): void;
    private pushtolist;
    private mergemarker;
}
declare class SecondaryMarker {
    constructor(x: number, y: number, size: number);
    posX: number;
    posY: number;
    size: number;
    counter: number;
    opacity: number;
    animationlength: number;
    stateFinished: boolean;
    draw(p: p5, color: p5.Color): void;
}
declare class SecondaryMarkerlist {
    constructor();
    markers: SecondaryMarker[];
    draw(p: p5, color: p5.Color): void;
    push(marker: SecondaryMarker): void;
    private removemarker;
}
export {};
