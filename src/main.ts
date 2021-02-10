import p5 from "p5";
import { Distribution } from "./ts/distributions/distribution";
import { Earth } from "./ts/models/earth";
import { ExponentialDistribution } from "./ts/distributions/exponential";
import { Player } from "./ts/models/player";
import { Meteor } from "./ts/models/meteor";
import { Impact } from "./ts/models/impact";
import { Star } from "./ts/models/star";
import "./style/main.scss";
import $ from 'jquery';
import { RNGeddonController } from "./ts/rngeddon";

const rngeddon = new RNGeddonController()

if ($('.rngeddon')) {
  new p5(rngeddon.game())
}

/*

//i will refactor this later
function line_intersection(p1: number[], p2: number[], p3: number[], p4: number[]) {
  let xdiff = [p1[0] - p2[0], p3[0] - p4[0]];
  let ydiff = [p1[1] - p2[1], p3[1] - p4[1]];

  function det(a: number[], b: number[]) {
    return a[0] * b[1] - a[1] * b[0];
  }

  let div = det(xdiff, ydiff);
  //if det 0 kein, schnittpunkt

  let d = [det(p1, p2), det(p3, p4)];
  let x = det(d, xdiff) / div;
  let y = det(d, ydiff) / div;

  return [x, y];
}

//i will refactor this later
function berechnungstuff(angle: number, point: number[]) {
  if (angle <= eckangle || angle >= 2 * PI - eckangle) {
    //rechte wand
    return line_intersection([width / 2, height / 2], point, [width, 0], [width, height]); // earth, meteorstart, wand_p1, wand_p2
  } else if (angle <= PI - eckangle) {
    //untere wand
    return line_intersection([width / 2, height / 2], point, [0, height], [width, height]);
  } else if (angle <= 1.5 * PI - (PI / 2 - eckangle)) {
    //linke wand
    return line_intersection([width / 2, height / 2], point, [0, 0], [0, height]);
  } else {
    //obere wand
    return line_intersection([width / 2, height / 2], point, [0, 0], [width, 0]);
  }
}

*/
