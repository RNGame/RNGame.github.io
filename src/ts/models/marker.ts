import p5 from "p5";

export const enum Direction{
    North,
    South,
    East,
    West,
}

const enum Alignment{
    Vertical,
    Horizontal,
}

export class Marker{
    constructor(x: number, y: number, size: number, direction: Direction){
        this.posX = x;
        this.posY = y;
        this.size = size;

        this.direction = direction;
        if(direction === Direction.East || direction === Direction.West){
            this.alignment = Alignment.Vertical;
            this.edge_large = this.posY + this.size/2;
            this.edge_small = this.posY - this.size/2;
        }else{
            this.alignment = Alignment.Horizontal;
            this.edge_large = this.posX + this.size/2;
            this.edge_small = this.posX - this.size/2;
        }
    }

    posX: number;
    posY: number;
    size: number;

    direction: Direction; //canvasedge the marker is on (north, east, south, west)
    alignment: Alignment; //is the canvasedge horizontal or vertical

    edge_large: number; //edge with the larger coordinate value
    edge_small: number; //edge with the smaller coordinate value


    draw(p: p5, color: p5.Color){
        p.push();

        this.rectanglemarker(p, color);
        // this.gradientbox(p color); //pretty laggy and doesnt look too good atm

        p.pop();
    }

    //can be refactored later
    private rectanglemarker(p: p5, color: p5.Color){
        let size2 = 10;
        //checks if it is on a vertical or horizontal edge and switches the values accordingly
        let width = this.alignment === Alignment.Vertical ? size2 : this.size;
        let height = this.alignment === Alignment.Vertical ? this.size : size2;

        p.noStroke();
        p.rectMode(p.CENTER);
        p.fill(color);
        p.rect(this.posX, this.posY, width, height);
    }

    //maybe to make the marker fancier
    private gradientbox(p: p5, color: p5.Color){
        let black = p.color(0);
        p.noFill();
        for (var w = 0; w < this.size; w++) {
            var inter = p.map(w, 0, this.size, 0, 1);
            var c = p.lerpColor(color, black, inter);
            p.stroke(c);
            p.rectMode(p.CENTER);
            p.square(this.posX, this.posY, w);
          }
    }
}

export class Markerlist{
    constructor(color: p5.Color){
        this.north = [];
        this.south = [];
        this.east = [];
        this.west = [];

        this.secondarymarkers = new SecondaryMarkerlist();

        this.color = color;
    }

    north: Marker[];
    south: Marker[];
    east: Marker[];
    west: Marker[];

    secondarymarkers: SecondaryMarkerlist;

    color: p5.Color;

    draw(p: p5){
        this.secondarymarkers.draw(p, this.color);

        this.north.forEach(marker => marker.draw(p, this.color));
        this.south.forEach(marker => marker.draw(p, this.color));
        this.east.forEach(marker => marker.draw(p, this.color));
        this.west.forEach(marker => marker.draw(p, this.color));

        //debug
        // console.log(`N: ${this.north.length}, E: ${this.east.length}, S: ${this.south.length}, W: ${this.west.length},`);

        //debug mit farben für jede wand ... wände passen :thumbs_up:
        // this.north.forEach(marker => marker.draw(p, p.color(255, 0, 0)));
        // this.south.forEach(marker => marker.draw(p, p.color(0, 255, 0)));
        // this.east.forEach(marker => marker.draw(p, p.color(255, 255, 0)));
        // this.west.forEach(marker => marker.draw(p, p.color(0, 150, 255)));
    }

    push(marker: Marker){
        switch(marker.direction as Direction){
            case Direction.North:
                this.pushtolist(marker, this.north, false);
                break;
            case Direction.South:
                this.pushtolist(marker, this.south, false);
                break;
            case Direction.East:
                this.pushtolist(marker, this.east, true);
                break;
            case Direction.West:
                this.pushtolist(marker, this.west, true);
                break;
        }

        this.secondarymarkers.push(new SecondaryMarker(marker.posX, marker.posY, marker.size));
    }

    private pushtolist(new_marker: Marker, list: Marker[], isvertical: boolean){
        //find the existing markers the new marker overlaps with
        let overlap = list.filter((marker) => {
            if(new_marker.edge_large <= marker.edge_large && new_marker.edge_large >= marker.edge_small) return marker;
            if(new_marker.edge_small <= marker.edge_large && new_marker.edge_small >= marker.edge_small) return marker;
        });

        //overlap can be of size 0, 1 or 2
        switch(overlap.length){
            //no overlap: push new_marker in markerlist
            case 0:
                list.push(new_marker);
                break;
            //overlaps with 1 marker: can be fully inside marker -> discard new_marker
            //only partially overlaps -> merge both markers together
            case 1:
                let large = new_marker.edge_small <= overlap[0].edge_large && new_marker.edge_large >= overlap[0].edge_large; //new_marker has larger edge
                let small = new_marker.edge_large >= overlap[0].edge_small && new_marker.edge_small <= overlap[0].edge_small; //new_marker has smaller edge
                if(large && small){
                    break;
                }
                if(large){
                    this.mergemarker(new_marker, overlap[0], list, new_marker.alignment);
                    list.splice(list.indexOf(overlap[0]), 1);
                }else if(small){
                    this.mergemarker(overlap[0], new_marker, list, new_marker.alignment);
                    list.splice(list.indexOf(overlap[0]), 1);
                }
                break;
            //overlap with 2 markers: merge the both markers together, remove old markers, new_marker can be discarded
            case 2:
                if(overlap[0].edge_large > overlap[1].edge_large){
                    this.mergemarker(overlap[0], overlap[1], list, new_marker.alignment);
                }else{
                    this.mergemarker(overlap[1], overlap[0], list, new_marker.alignment);
                }
                list.splice(list.indexOf(overlap[0]), 1);
                list.splice(list.indexOf(overlap[1]), 1);
                break;    
        }
    }

    private mergemarker(marker_large: Marker, marker_small: Marker, list: Marker[], alignment: Alignment){
        let newSize = marker_large.edge_large - marker_small.edge_small;
        let newCoord = marker_large.edge_large - newSize/2;
        if(alignment === Alignment.Vertical){
            list.push(new Marker(marker_large.posX, newCoord, newSize, marker_large.direction));
        }else{
            list.push(new Marker(newCoord, marker_large.posY, newSize, marker_large.direction));
        }
    }
}

class SecondaryMarker{
    constructor(x: number, y: number, size: number){
        this.posX = x;
        this.posY = y;
        this.size = size * 1.25;

        this.counter = 0;
        this.stateFinished = false;
    }

    posX: number;
    posY: number;
    size: number;

    counter: number;
    opacity = 200;
    animationlength = 300;
    stateFinished: boolean;

    draw(p: p5, color: p5.Color){
        if(this.counter >= this.animationlength){
            this.stateFinished = true;
            return;
        }
        this.counter++;

        let opacity = this.opacity - this.opacity / this.animationlength * this.counter
        //lighten up the color
        // let mixcolor = p.lerpColor(color, p.color(255), 1)
        // mixcolor.setAlpha(opacity);
        let mixcolor = p.color(255, opacity);

        p.push();

        p.noStroke();
        p.fill(mixcolor);
        p.ellipseMode(p.CENTER);
        p.ellipse(this.posX, this.posY, this.size);

        p.pop();
    }
}

class SecondaryMarkerlist{
    constructor(){
        this.markers = [];
    }

    markers: SecondaryMarker[];

    draw(p: p5, color: p5.Color){
        this.markers.forEach(marker => {
            if(marker.stateFinished){
                this.removemarker(marker);
                return;
            }
            marker.draw(p, color)
        });

        // console.log(`SecMarkerLength: ${this.markers.length}`);
    }

    push(marker: SecondaryMarker){
        this.markers.push(marker);
    }

    private removemarker(marker: SecondaryMarker){
        this.markers.splice(this.markers.indexOf(marker), 1);
    }
}