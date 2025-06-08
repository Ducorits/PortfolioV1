interface Point {
  x: number;
  y: number;
}

class Particle {
  effect: Effect;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  speedModifier: number;
  point: Point[];
  maxLength: number;
  angle: number;
  newAngle: number;
  angleCorrector: number;
  timer: number;
  colors: string[];
  color: string;

  constructor(effect: Effect) {
    this.effect = effect;
    this.x = Math.floor(Math.random() * this.effect.width);
    this.y = Math.floor(Math.random() * this.effect.height);
    this.speedX = 0;
    this.speedY = 0;
    this.speedModifier = Math.floor(Math.random() * 3 + 1);
    this.point = [{ x: this.x, y: this.y }];
    this.maxLength = 200;
    this.angle = 0;
    this.newAngle = 0;
    this.angleCorrector = 0.5;
    this.timer = this.maxLength * 2;
    this.colors = [
      "#5232a8",
      "#6b45d6",
      "#4c15e6",
      "#3415e6",
      "#5940e6",
      "#8778de",
      "#9625db",
    ];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.moveTo(this.point[0].x, this.point[0].y);
    for (let i = 0; i < this.point.length; i++) {
      context.lineTo(this.point[i].x, this.point[i].y);
    }
    context.strokeStyle = this.color;
    context.stroke();
  }

  update() {
    if (
      this.x < this.effect.width &&
      this.x > 0 &&
      this.y < this.effect.height &&
      this.y > 0
    ) {
      let x = Math.floor(this.x / this.effect.cellSize);
      let y = Math.floor(this.y / this.effect.cellSize);
      let index = y * this.effect.cols + x;

      if (this.effect.flowField[index]) {
        this.newAngle = this.effect.flowField[index].colorAngle;
        if (this.angle > this.newAngle) this.angle -= this.angleCorrector;
        else if (this.angle < this.newAngle) this.angle += this.angleCorrector;
        else this.angle = this.newAngle;
      }

      this.speedX = Math.cos(this.angle);
      this.speedY = Math.sin(this.angle);
      this.x += this.speedX * this.speedModifier;
      this.y += this.speedY * this.speedModifier;

      this.point.push({ x: this.x, y: this.y });
      if (this.point.length > this.maxLength) {
        this.point.shift();
      }
    } else if (this.point.length > 1) {
      this.point.shift();
    } else {
      this.reset();
    }
  }

  reset() {
    let attempts = 0;
    let resetSuccess = false;

    if (!resetSuccess) {
      this.x = Math.floor(Math.random() * this.effect.width);
      this.y = Math.floor(Math.random() * this.effect.height);
      this.point = [{ x: this.x, y: this.y }];
      this.timer = this.maxLength * 2;
    }
  }
}

interface FlowField {
  x: number;
  y: number;
  alpha: number;
  colorAngle: number;
}

class Effect {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  particles: Particle[];
  numberOfParticles: number;
  cellSize: number;
  rows: number;
  cols: number;
  flowField: FlowField[];
  curve: number;
  zoom: number;
  debug: boolean;
  initialized: boolean;

  constructor() {
    this.context = null as any;
    this.width = 0;
    this.height = 0;
    this.particles = [];
    this.numberOfParticles = 500;
    this.cellSize = 5;
    this.rows = 0;
    this.cols = 0;
    this.flowField = [];
    this.curve = 2;
    this.zoom = 0.01;
    this.debug = false;
    this.initialized = false;
  }
  // constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
  // 	this.context = ctx;
  // 	this.width = width;
  // 	this.height = height;
  // 	this.particles = [];
  // 	this.numberOfParticles = 1000;
  // 	this.cellSize = 5;
  // 	this.rows = 0;
  // 	this.cols = 0;
  // 	this.flowField = [];
  // 	this.curve = 2;
  // 	this.zoom = 0.01;
  // 	this.debug = false;
  // 	this.init();

  // 	window.addEventListener('keydown', e => {
  // 		if (e.key === 'd') this.debug = !this.debug;
  // 	});
  // }

  drawText() {
    this.context.font = "300px Arial";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";

    const gradient1 = this.context.createLinearGradient(
      0,
      0,
      this.width,
      this.height
    );
    gradient1.addColorStop(0.2, "rgb(255,0,255)");
    gradient1.addColorStop(0.4, "rgb(255,0,255)");
    gradient1.addColorStop(0.6, "rgb(255,255,255)");
    gradient1.addColorStop(0.8, "rgb(0,0,255)");

    this.context.fillStyle = "rgba(150,150,150,0.8)";
    // this.context.fillText('duco', this.width * 0.5, this.height * 0.5, this.width * 0.8);
  }

  init(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.context = ctx;
    this.width = width;
    this.height = height;
    this.rows = Math.floor(this.height / this.cellSize);
    this.cols = Math.floor(this.width / this.cellSize);
    this.flowField = [];

    this.drawText();

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let angle =
          (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
        this.flowField.push({
          x: x,
          y: y,
          alpha: 1,
          colorAngle: angle,
        });
      }
    }

    this.particles = [];
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
    this.initialized = true;
  }

  drawGrid() {
    this.context.save();
    this.context.strokeStyle = "white";
    this.context.lineWidth = 0.3;
    for (let c = 0; c < this.cols; c++) {
      this.context.beginPath();
      this.context.moveTo(this.cellSize * c, 0);
      this.context.lineTo(this.cellSize * c, this.height);
      this.context.stroke();
    }
    for (let r = 0; r < this.rows; r++) {
      this.context.beginPath();
      this.context.moveTo(0, this.cellSize * r);
      this.context.lineTo(this.width, this.cellSize * r);
      this.context.stroke();
    }
    this.context.restore();
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  render() {
    if (this.debug) {
      this.drawGrid();
      this.drawText();
    }
    this.particles.forEach((particle) => {
      particle.draw(this.context);
      particle.update();
    });
    this.drawText();
  }
}

let effect: Effect = new Effect();
let animationStarted = false;
let animationId: number;

function animate() {
  effect.clear();
  effect.render();
  animationId = requestAnimationFrame(animate);
}

export function stopFlowField() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationStarted = false;
  }
}

export function drawFlowField(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  if (
    effect.initialized == false ||
    effect.width !== ctx.canvas.width ||
    effect.height !== ctx.canvas.height
  ) {
    effect.init(ctx, width, height);
    if (animationStarted == false) {
      animationStarted = true;
      animate();
    }
  }
}
