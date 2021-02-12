import { Distribution, DistributionType } from "./distribution";
import { GeneratorInput } from "./generator_input";
export declare class UniformDistribution implements Distribution {
    _min: GeneratorInput;
    _max: GeneratorInput;
    _mean: number;
    _variance: number;
    _type: DistributionType;
    _rng: () => number;
    _range: number;
    constructor(rng: () => number, min: GeneratorInput, max: GeneratorInput);
    get min(): number;
    get max(): number;
    get mean(): number;
    get variance(): number;
    get type(): DistributionType;
    get range(): number;
    random(): number;
}
