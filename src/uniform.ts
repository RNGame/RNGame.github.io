class UniformDistribution implements Distribution {
  _min: number;
  _max: number;
  _mean: number;
  _variance: number;
  _type: DistributionType;
  _rng: () => number;
  _range: number;

  constructor(rng: () => number, min: number, max: number) {
    this._rng = rng;
    this._min = min;
    this._max = max;
    this._range = max - min;
    this._mean = min + this._range / 2;
    this._variance = (this._range * this._range) / 12;
    this._type = DistributionType.Continuous;
  }

  get min(): number {
    return this._min;
  }

  get max(): number {
    return this._max;
  }

  get mean(): number {
    return this._mean;
  }

  get variance(): number {
    return this._variance;
  }

  get type(): DistributionType {
    return this._type;
  }

  random(): number {
    return this._min + this._rng() * this._range;
  }
}
