export class Screen {
  constructor(canvas, width = 800, height = 800, bgColor = "#222021") {
    this.ctx = canvas.getContext("2d")
    this.width = width
    this.height = height
    this.bgColor = bgColor
    
    canvas.width = width
    canvas.height = height

    this.clear()

    this.elements = []
  }
    
  static worldToScreenCoords(x ,y, offsetX, offsetY) {
    // -1,1 => 0,W/H
    const x_ = ((x + 1) * WIDTH) / 2 - offsetX / 2;
    const y_ = ((-y + 1) * HEIGHT) / 2 - offsetY / 2;

    return { x: x_, y: y_};
  }

  clear() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}
