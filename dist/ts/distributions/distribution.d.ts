export declare enum DistributionType {
    Unknown = 0,
    Continuous = 1,
    Discrete = 2
}
export interface Distribution {
    min: number;
    max: number;
    mean: number;
    variance: number;
    type: DistributionType;
    random(): number;
}
