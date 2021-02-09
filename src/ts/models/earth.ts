import p5 from "p5";

export class Earth {
    earthImage: p5.Image;
    earthRotation: number = 0;
    private earthSize: number
	constructor(earthSize: number) {
        this.earthSize = earthSize
    }

	draw(p: p5) {
		p.push();
		const centerX = p.width / 2;
		const centerY = p.height / 2;
		p.translate(centerX, centerY);
		p.rotate(this.earthRotation);
		p.image(this.earthImage, 0, 0, this.earthSize, this.earthSize);
		this.earthRotation = this.earthRotation + 0.001;
		p.pop();
	}
}
