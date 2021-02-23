import { Distribution, DistributionType } from "./distribution";
import { GeneratorInput } from "./generator_input";
export declare class ExponentialDistribution implements Distribution {
    _min: number;
    _max: number;
    _mean: number;
    _variance: number;
    _type: DistributionType;
    _rng: () => number;
    _range: number;
    _lambda: GeneratorInput;
    constructor(rng: () => number, lambda: GeneratorInput);
    get min(): number;
    get max(): number;
    get mean(): number;
    get variance(): number;
    get type(): DistributionType;
    random(): number;
}
