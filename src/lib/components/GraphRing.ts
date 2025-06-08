import { Color, Container, Graphics, type StrokeInput } from "pixi.js";

interface Orbital {
  container: Container;
  angle: number;
}

export class GraphRing extends Container {
  circle: Graphics;
  orbitals: Orbital[];
  radius: number;
  speed: number;
  angleOffset: number;

  constructor(
    radius: number,
    speed: number,
    stroke?: StrokeInput,
    angleOffset?: number
  ) {
    super();
    this.speed = speed;
    this.radius = radius;
    this.angleOffset = angleOffset ? angleOffset : 0;
    this.orbitals = [];
    this.circle = new Graphics()
      .circle(0, 0, radius)
      .stroke(stroke ?? { color: new Color(0x6f16e4), width: 4 });
    this.addChild(this.circle);
  }

  /**
   * Add an orbital (must be a Container or subclass) and reposition all orbitals
   */
  addOrbital(container: Container) {
    const initialAngle =
      (this.orbitals.length / (this.orbitals.length + 1)) * Math.PI * 2 +
      this.angleOffset;
    this.orbitals.push({ container, angle: initialAngle });
    this.addChild(container);
    this.setOrbitalPositions();
  }

  /**
   * Evenly space orbitals around the circle based on current radius
   */
  setOrbitalPositions() {
    const count = this.orbitals.length;
    if (count === 0) return;
    const angleStep = (Math.PI * 2) / count;

    this.orbitals.forEach((orbital, i) => {
      const angle = i * angleStep + this.angleOffset;
      orbital.angle = angle;
      orbital.container.x = Math.cos(angle) * this.radius;
      orbital.container.y = Math.sin(angle) * this.radius;
    });
  }

  /**
   * Call every frame to advance each orbital
   * @param deltaTimeSec time elapsed since last frame, in seconds
   */
  public update(deltaTimeSec: number) {
    const angularSpeed = this.speed / this.radius;
    // (pixels/sec) ÷ (pixels) = radians/sec

    this.orbitals.forEach((o) => {
      o.angle += angularSpeed * deltaTimeSec;
      o.container.x = Math.cos(o.angle) * this.radius;
      o.container.y = Math.sin(o.angle) * this.radius;
    });
  }
}
