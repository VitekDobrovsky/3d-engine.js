export class Screen {
  constructor(canvas, width = 800, height = 800, bgColor = "#222021") {
    this.ctx = canvas.getContext("2d")
    this.width = width
    this.height = height
    this.bgColor = bgColor
    
    canvas.width = width
    canvas.height = height

    this.clear()

    this.polygons = []
  }
 
  static project3Dto2D(x, y, z, width, height) {
    const x_ = x / z;
    const y_ = y / z;
      
    const width_ = width / z;
    const height_ = height / z;

    return { x: x_, y: y_, width: width_, height: height_ };
  }

  worldToScreenCoords(x ,y, width, height) {
    // -1,1 => 0,W/H

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

  drawPolygons() {
    for (const p of this.polygons) {
      const flatCoords = Screen.project3Dto2D(p.x, p.y, p.z, p.width, p.height)
      const sCoords = this.worldToScreenCoords(flatCoords.x, flatCoords.y, flatCoords.width, flatCoords.height)
      p.drawOnScreenCoord(this.ctx, sCoords.x, sCoords.y, sCoords.width, sCoords.height)
    }
  }
}
