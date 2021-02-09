export enum DistributionType {
  Unknown,
  Continuous,
  Discrete,
}

export interface Distribution {
  min: number;
  max: number;
  mean: number;
  variance: number;
  type: DistributionType;

  random(): number;
}
