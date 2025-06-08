import { Color, Container, Graphics, Point, Text } from "pixi.js";
import { selectedProject } from "$lib/stores/shared.svelte";

export class CodamProjectBubble extends Container {
  id: string;
  borderColor: Color;
  fillColor: Color;
  radius: number;
  text: Text;
  circle: Graphics;
  startPos: Point;

  constructor(text: string, radius?: number, pos?: Point) {
    super();
    this.id = text;
    this.borderColor = new Color(0x6f16e4);
    this.fillColor = new Color(0x6f16e4);
    this.radius = radius ? radius : 40;
    this.startPos = pos ? pos : new Point();
    this.text = new Text({
      text: text,
      style: {
        fontFamily: "Arial",
        fontSize: 48,
        fontWeight: "bold",
        fill: 0xffffff,
        align: "left",
      },
    });

    this.position = this.startPos;

    let scale = 1;
    if (this.text.width > this.radius * 2 * 0.8)
      scale = (this.radius * 2 * 0.8) / this.text.width;
    this.text.scale.set(scale);
    this.text.x -= this.text.width / 2;
    this.text.y -= this.text.height / 2;
    this.circle = new Graphics()
      .circle(0, 0, this.radius)
      .fill(this.fillColor)
      .stroke({ color: this.borderColor, width: 4 });

    this.circle.interactive = true;
    this.circle.cursor = "pointer";
    this.circle.on("pointertap", () => {
      if (selectedProject.id != this.id) selectedProject.id = this.id;
      else selectedProject.id = "";
    });

    this.addChild(this.circle);
    this.addChild(this.text);
  }
}
