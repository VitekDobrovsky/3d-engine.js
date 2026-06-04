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

  clear() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

}
