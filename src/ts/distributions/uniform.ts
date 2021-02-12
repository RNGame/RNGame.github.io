import { Distribution, DistributionType } from "./distribution";
import { GeneratorInput } from "./generator_input";

export class UniformDistribution implements Distribution {
  _min: GeneratorInput;
  _max: GeneratorInput;
  _mean: number;
  _variance: number;
  _type: DistributionType;
  _rng: () => number;
  _range: number;

  constructor(rng: () => number, min: GeneratorInput, max: GeneratorInput) {
    this._rng = rng;
    this._min = min;
    this._max = max;
    this._range = max.getInput() - min.getInput();
    this._mean = min.getInput() + this._range / 2;
    this._variance = (this.range * this.range) / 12;
    this._type = DistributionType.Continuous;
  }

  get min(): number {
    return this._min.getInput();
  }

  get max(): number {
    return this._max.getInput();
  }

  get mean(): number {
    this._mean = this._min.getInput() + this.range / 2;
    return this._mean;
  }

  get variance(): number {
    return this._variance;
  }

  get type(): DistributionType {
    return this._type;
  }

  get range(): number {
    this._range = this._max.getInput() - this._min.getInput();
    return this._range;
  }

  random(): number {
    return this._min.getInput() + this._rng() * this.range;
  }
}
