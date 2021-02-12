import { GeneratorInput } from "./generator_input";

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
