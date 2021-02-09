import { Distribution, DistributionType } from "./distribution";
export declare class ExponentialDistribution implements Distribution {
    _min: number;
    _max: number;
    _mean: number;
    _variance: number;
    _type: DistributionType;
    _rng: () => number;
    _range: number;
    constructor(rng: () => number, lambda: number);
    get min(): number;
    get max(): number;
    get mean(): number;
    get variance(): number;
    get type(): DistributionType;
    random(): number;
}
