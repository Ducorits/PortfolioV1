import { Color, Container, Graphics, Point, Text } from "pixi.js";
import { selectedProject } from "$lib/stores/shared.svelte";

export class CodamProjectBubble {
  id: string;
  borderColor: Color;
  fillColor: Color;
  radius: number;
  container: Container;
  text: Text;
  circle: Graphics;
  startPos: Point;

  constructor(text: string, pos: Point) {
    this.id = text;
    this.borderColor = new Color(0x6f16e4);
    this.fillColor = new Color(0x6f16e4);
    this.radius = 40;
    this.startPos = pos;
    this.container = new Container();
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

    this.container.position = pos;

    let scale = 1;
    if (this.text.width > this.radius * 2 * 0.8)
      scale = (this.radius * 2 * 0.8) / this.text.width;
    this.text.scale.set(scale);
    this.text.x -= this.text.width / 2;
    this.text.y -= this.text.height / 2;
    this.circle = new Graphics()
      .circle(0, 0, 50)
      .fill(this.fillColor)
      .stroke({ color: this.borderColor, width: 4 });

    this.circle.interactive = true;
    this.circle.cursor = "pointer";
    this.circle.on("pointertap", () => {
      if (selectedProject.id != this.id) selectedProject.id = this.id;
      else selectedProject.id = "";
    });

    this.container.addChild(this.circle);
    this.container.addChild(this.text);
  }
}
