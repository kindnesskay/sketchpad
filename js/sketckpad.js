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
    this.canvas.onmousedown = (evt) => {
      this.isDrawing = true;
      const mouse = this.#getMouse(evt);
      this.paths.push([mouse])

    };

    this.canvas.onmousemove = (evt) => {
      if (!this.isDrawing) return;
      const mouse = this.#getMouse(evt);
      const lastPath = this.paths[this.paths.length - 1];
      lastPath.push(mouse);
      this.#reDraw();
    };

    this.canvas.onmouseup = () => {
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
   draw.paths(this.ctx,this.paths)
  }

  
}

export default SketchPad;
