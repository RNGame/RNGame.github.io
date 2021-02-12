import Plotly from "plotly.js";
import { Distribution } from "./distribution";
import { GeneratorInput } from "./generator_input";
import { NormalDistribution } from "./normal";
import { UniformDistribution } from "./uniform";
import $ from "jquery";

export class RandomNumberGenerator {
  distribution: Distribution;

  distributionSelect: JQuery;

  generators: { mean: GeneratorInput; sd: GeneratorInput; min: GeneratorInput; max: GeneratorInput };

  purpose: string;
  diagramId: string;
  xAxisLabel: string;
  yAxisLabel: string;

  data: number[] = [];
  dataToDegree: boolean

  private randomNumberGenerator = Math.random;

  constructor(
    parentId: string,
    purpose: string,
    xAxisLabel: string,
    yAxisLabel: string,
    generators: { mean: GeneratorInput; sd: GeneratorInput; min: GeneratorInput; max: GeneratorInput },
    intialDistribution = "normal",
    dataToDegree = false
  ) {
    this.purpose = purpose;
    this.diagramId = this.hashCode(purpose);
    this.xAxisLabel = xAxisLabel;
    this.yAxisLabel = yAxisLabel;
    this.generators = generators;
    this.dataToDegree = dataToDegree;

    $(`#${parentId}`).prepend(
      $(`
          <div class="spacer"></div>
  
          <div id="diagram-${this.diagramId}" class="diagram"></div>
          <div class="spacer"></div>
          <div id="diagram-button-${this.diagramId}" class="btn small">Plot</div>
          `)
    );

    this.distributionSelect = $(`#${parentId}`).prepend(
      $(`
          <select id="dist-${this.diagramId}">
              <option value="normal">Normal distribution</option>
              <option value="uniform">Uniform distribution</option>
          </select>`)
    );

    $(`#${parentId}`).prepend($(`<label for="dist-${purpose}">${purpose}</label>`));

    this.switchMeteorAngleDistribution(intialDistribution);

    const self = this;
    $(() => {
      $(`#dist-${this.diagramId}`).on("input", (event) => {
        const value = (<HTMLInputElement>event.target).value;
        self.switchMeteorAngleDistribution(value);
      });
      self.plotDistribution(self.data);
    });
    $(`#diagram-button-${this.diagramId}`).click(() => {
      self.plotDistribution(self.data);
    });
  }

  public getNumber() {
    const number = this.distribution.random();
    let diagramNumber = number;
    if (this.dataToDegree) {
        diagramNumber = number * (180 / Math.PI);
    }
    this.data.push(diagramNumber);
    return number;
  }

  public reset() {
    this.data = [];
    this.plotDistribution(this.data);
    this.generators.max.reset()
    this.generators.min.reset()
    this.generators.sd.reset()
    this.generators.mean.reset()
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

  private switchMeteorAngleDistribution(distribution: string) {
    switch (distribution) {
      case "uniform":
        this.generators.min.disabled(false);
        this.generators.min.disabled(false);
        this.generators.sd.disabled(true);
        this.generators.mean.disabled(true);
        this.distribution = new UniformDistribution(
          this.randomNumberGenerator,
          this.generators.min,
          this.generators.max
        );
        break;
      case "normal":
        this.generators.sd.disabled(false);
        this.generators.mean.disabled(false);
        this.generators.min.disabled(true);
        this.generators.min.disabled(true);
        this.distribution = new NormalDistribution(
          this.randomNumberGenerator,
          this.generators.mean,
          this.generators.sd
        );
        break;
    }

    this.reset();
    // TODO Marker callback
  }

  private async plotDistribution(angleData: number[]) {
    const data: Plotly.Data[] = [
      {
        x: angleData,
        type: "histogram",
      },
    ];

    const config: Partial<Plotly.Config> = {
      scrollZoom: false,
      displayModeBar: false,
    };

    const layout = {
      title: this.purpose,
      showlegend: false,
      margin: {
        t: 40,
        b: 40,
      },
      xaxis: {
        title: {
          text: this.xAxisLabel,
          font: {
            family: "Courier New, monospace",
            size: 18,
            color: "#fff",
          },
        },
      },
      yaxis: {
        title: {
          text: this.yAxisLabel,
          font: {
            family: "Courier New, monospace",
            size: 18,
            color: "#fff",
          },
        },
      },
    };

    Plotly.newPlot(`diagram-${this.diagramId}`, data, layout, config);
  }
}
