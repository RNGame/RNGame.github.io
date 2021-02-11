import { Distribution, DistributionType } from "./distribution";
export declare class NormalDistribution implements Distribution {
    _min: number;
    _max: number;
    _mean: number;
    _sd: number;
    _variance: number;
    _type: DistributionType;
    _rng: () => number;
    _range: number;
    _y1: number | null;
    _y2: number | null;
    constructor(rng: () => number, mean: number, sd: number);
    get min(): number;
    get max(): number;
    get mean(): number;
    get variance(): number;
    get type(): DistributionType;
    random(): number;
}
