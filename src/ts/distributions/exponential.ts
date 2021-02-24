import { Distribution, DistributionType } from "./distribution";
import { GeneratorInput } from "./generator_input";

export class ExponentialDistribution implements Distribution {
    _min: number;
    _max: number;
    _mean: number;
    _variance: number;
    _type: DistributionType;
    _rng: () => number;
    _range: number;
    _lambda: GeneratorInput;
  
    constructor(rng: () => number, lambda: GeneratorInput) {
        this._rng = rng;
        this._min = 0;
        this._max = Number.POSITIVE_INFINITY;
        this._lambda = lambda;
        const lambdaNumber = lambda.getInput()
        this._mean = 1 / lambdaNumber;
        this._variance = Math.pow(lambdaNumber, -2);
        this._type = DistributionType.Continuous;
    }
  
    get min(): number {
      return this._min;
    }
  
    get max(): number {
      return this._max;
    }
  
    get mean(): number {
      this._mean = 1 / this._lambda.getInput();
      return this._mean;
    }
  
    get variance(): number {
      return this._variance;
    }
  
    get type(): DistributionType {
      return this._type;
    }
  
    random(): number {
        return -1 * Math.log(this._rng()) * this.mean;
    }
  }
  