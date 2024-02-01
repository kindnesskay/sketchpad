import { draw } from "./draw.js";
class SketchPad {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.#addEventListener();
    this.paths = [];
    this.isDrawing = false;
    this.color = "black";
  }
  #addEventListener() {
    this.canvas.onmousedown = (evt) => {
      this.isDrawing = true;
      const color = this.color;
      const mouse = this.#getMouse(evt);
      this.paths.push({ color: color, path: [mouse] });
    };

    this.canvas.onmousemove = (evt) => {
      if (!this.isDrawing) return;
      const mouse = this.#getMouse(evt);
      const color = this.color;
      const lastPath = this.paths[this.paths.length - 1].path;
      lastPath.push(mouse);

      this.#reDraw();
    };

    this.canvas.onmouseup = () => {
      this.isDrawing = false;
    };

    // handle touch events
    this.canvas.ontouchstart = (evt) => {
      this.isDrawing = true;
      const color = this.color;
      const mouse = this.#getMouse(evt.changedTouches[0]);
      this.paths.push({ color: color, path: [mouse] });
    };

    this.canvas.ontouchmove = (evt) => {
      if (!this.isDrawing) return;
      const mouse = this.#getMouse(evt.changedTouches[0]);
      const color = this.color;
      const lastPath = this.paths[this.paths.length - 1].path;
      lastPath.push(mouse);

      this.#reDraw();
    };

    this.canvas.touchend = () => {
      this.isDrawing = false;
    };
  }

  #getMouse(evt) {
    const rect = this.canvas.getBoundingClientRect();
    const mouse = [
      Math.round(evt.clientX - rect.left),
      Math.round(evt.clientY - rect.top),
    ];
    return mouse;
  }

  #reDraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw.paths(this.ctx, this.paths, this.color);
  }
  setColor(color) {
    this.color = color;
  }
}

export default SketchPad;
