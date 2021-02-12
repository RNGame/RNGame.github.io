/// <reference types="jquery" />
import { Distribution } from "./distribution";
import { GeneratorInput } from "./generator_input";
export declare class RandomNumberGenerator {
    distribution: Distribution;
    distributionSelect: JQuery;
    generators: {
        mean: GeneratorInput;
        sd: GeneratorInput;
        min: GeneratorInput;
        max: GeneratorInput;
    };
    purpose: string;
    diagramId: string;
    xAxisLabel: string;
    yAxisLabel: string;
    data: number[];
    dataToDegree: boolean;
    private randomNumberGenerator;
    constructor(parentId: string, purpose: string, xAxisLabel: string, yAxisLabel: string, generators: {
        mean: GeneratorInput;
        sd: GeneratorInput;
        min: GeneratorInput;
        max: GeneratorInput;
    }, intialDistribution?: string, dataToDegree?: boolean);
    getNumber(): number;
    reset(): void;
    private hashCode;
    private switchMeteorAngleDistribution;
    private plotDistribution;
}
