/// <reference types="jquery" />
export interface GeneratorInput {
    getInput(): number;
    reset(): void;
    disabled(bool: boolean): void;
}
export declare class SliderInput implements GeneratorInput {
    min: number;
    max: number;
    step: number;
    initial: number;
    currentValue: number;
    sliderName: string;
    sliderId: string;
    parentId: string;
    sliderElement: JQuery | JQuery<HTMLInputElement>;
    sliderLabel: JQuery;
    constructor(min: number, max: number, initial: number, sliderName: string, parentId: string, step?: number);
    reset(): void;
    disabled(bool: boolean): void;
    getInput(): number;
    private hashCode;
}
export declare class StaticInput implements GeneratorInput {
    number: number;
    constructor(number: number);
    reset(): void;
    disabled(bool: boolean): void;
    getInput(): number;
}
