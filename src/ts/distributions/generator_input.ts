import $ from "jquery";

export interface GeneratorInput {
  getInput(): number;
  disabled(bool: boolean): void;
}

export class SliderInput implements GeneratorInput {
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

  constructor(min: number, max: number, initial: number, sliderName: string, parentId: string, step: number = 1) {
    this.min = min;
    this.max = max;
    this.step = step;
    this.sliderName = sliderName;
    this.sliderId = this.hashCode(sliderName + parentId);
    this.parentId = parentId;
    this.currentValue = initial;

    if ($("#" + parentId).length === 0) {
      throw new Error("DOM Element with " + parentId + " does not exist.");
    }

    $("#" + parentId).append(
      $(
        `<label for="slider-${this.sliderId}" class="range-slider-label">${this.sliderName}: <span id="slider-${this.sliderId}-label">${this.currentValue}</span></label>`
      )
    );

    this.sliderLabel = $(`#slider-${this.sliderId}-label`);

    $("#" + parentId).append(
      $(
        `<input min="${min}" max="${max}" value="${initial}" step="${step}" id="slider-${this.sliderId}" type="range" class="range-slider" />`
      )
    );

    this.sliderElement = $(`#slider-${this.sliderId}`);

    const self = this;
    this.sliderElement.on("input", (event) => {
      const value = (<HTMLInputElement>event.target).value;
      console.log(value);
      self.currentValue = +value;
      self.sliderLabel.text(self.currentValue);
    });
  }

  disabled(bool: boolean): void {
    if (bool) {
      this.sliderElement.hide();
      this.sliderLabel.parent().hide();
      return;
    }
    this.sliderElement.show();
    this.sliderLabel.parent().show();
  }

  getInput(): number {
    return +this.sliderElement.val();
  }

  private hashCode(str: string): string {
    var hash = 0,
      i,
      chr;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
  }
}

export class StaticInput implements GeneratorInput {
  number: number;
  constructor(number: number) {
    this.number = number;
  }
  disabled(bool: boolean): void {
    return;
  }

  public getInput(): number {
    return this.number;
  }
}
