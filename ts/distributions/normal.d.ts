import { Distribution, DistributionType } from "./distribution";
import { GeneratorInput } from "./generator_input";
export declare class NormalDistribution implements Distribution {
    _min: number;
    _max: number;
    _mean: GeneratorInput;
    _sd: GeneratorInput;
    _variance: number;
    _type: DistributionType;
    _rng: () => number;
    _range: number;
    _y1: number | null;
    _y2: number | null;
    constructor(rng: () => number, mean: GeneratorInput, sd: GeneratorInput);
    get min(): number;
    get max(): number;
    get mean(): number;
    get variance(): number;
    get type(): DistributionType;
    random(): number;
}
