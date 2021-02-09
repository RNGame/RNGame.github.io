enum DistributionType {
  Unknown,
  Continuous,
  Discrete,
}

interface Distribution {
  min: number;
  max: number;
  mean: number;
  variance: number;
  type: DistributionType;

  random(): number;
}
