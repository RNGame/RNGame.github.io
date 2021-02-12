import { Distribution, DistributionType } from "./distribution";
import { GeneratorInput } from "./generator_input";

export class NormalDistribution implements Distribution {
    _min: number;
    _max: number;
    _mean: GeneratorInput; //mittelwert
    _sd: GeneratorInput; //standardabweichung
    _variance: number; //varianz
    _type: DistributionType;
    _rng: () => number;
    _range: number;
    _y1: number | null;
    _y2: number | null;
  
    constructor(rng: () => number, mean: GeneratorInput, sd: GeneratorInput) {
      this._rng = () => {
          return rng() * 2 - 1 //wert im bereich [-1, 1]
        };
      this._min = Number.NEGATIVE_INFINITY;
      this._max = Number.POSITIVE_INFINITY;
      this._mean = mean;
      this._sd = sd;
      this._variance = this._sd.getInput() * this._sd.getInput();
      this._type = DistributionType.Continuous;
      this._y1 = null;
      this._y2 = null;
    }
  
    get min(): number {
      return this._min;
    }
  
    get max(): number {
      return this._max;
    }
  
    get mean(): number {
      return this._mean.getInput();
    }
  
    get variance(): number {
      this._variance = this._sd.getInput() * this._sd.getInput();
      return this._variance;
    }
  
    get type(): DistributionType {
      return this._type;
    }
  
    random(): number {
      let x1: number;
      let x2: number;
      let w: number;

      if(this._y2 !== null){
          this._y1 = this._y2;
          this._y2 = null;
          return this._y1 * this._sd.getInput() + this._mean.getInput();
      }

      do {
        x1 = this._rng();
        x2 = this._rng();
        w = x1 * x1 + x2 * x2;
      } while(w >= 1.0 || w === 0.0);

      w = Math.sqrt((-2.0 * Math.log(w)) / w);
      this._y1 = x1 * w;
      this._y2 = x2 * w;
      return this._y1 * this._sd.getInput() + this._mean.getInput();
    }
  }