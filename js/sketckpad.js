import { draw } from "./draw.js";
class SketchPad {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.#addEventListener();
    this.paths = [];
    this.isDrawing = false;
  }
  #addEventListener() {
    const lastPath = [];
    this.canvas.onmousedown = (evt) => {
      const mouse = this.#getMouse(evt);
      lastPath.push(mouse);
      this.isDrawing = true;
    };

    this.canvas.onmousemove = (evt) => {
      if (!this.isDrawing) return;
      const mouse = this.#getMouse(evt);
      lastPath.push(mouse);
      this.#draw(lastPath)
    };

    this.canvas.onmouseup = () => {
      this.paths.push(lastPath);
      this.isDrawing = false;
    //   this.#reDraw();
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
    this.ctx.moveTo(...this.paths[0][0]);
    for (let i = 0; i < this.paths[0].length; i++) {
      this.ctx.lineTo(...this.paths[0][i]);
      console.log(i);
    }
    this.ctx.stroke();
  }

  #draw(array) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw.path(this.ctx,array)
  }
}

export default SketchPad;
