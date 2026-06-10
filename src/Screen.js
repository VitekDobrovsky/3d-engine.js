export class Screen {
  constructor(canvas, width = 800, height = 800, bgColor = "#222021") {
    this.ctx = canvas.getContext("2d")
    this.width = width
    this.height = height
    this.bgColor = bgColor
    
    canvas.width = width
    canvas.height = height

    this.clear()
  }
 
  worldToScreenCoords(x ,y, width, height) {
    const width_ = (width / 2) * this.width
    const height_ = height / 2 * this.height

    const x_ = ((x + 1) * this.width) / 2 - width_ / 2;
    const y_ = ((-y + 1) * this.height) / 2 - height_ / 2;

    return { x: x_, y: y_, width: width_, height: height_ };
  }

  clear() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}
