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
    
  worldToScreenCoords(x ,y, offsetX, offsetY) {
    if (offsetX === undefined) offsetX = 0;
    if (offsetY === undefined) offsetY = 0;

    // -1,1 => 0,W/H
    const x_ = ((x + 1) * this.width) / 2 - offsetX / 2;
    const y_ = ((-y + 1) * this.height) / 2 - offsetY / 2;

    return { x: x_, y: y_};
  }

  static project3Dto2D(x, y, z) {
    const x_ = x / z;
    const y_ = y / z;
    
    return { x: x_, y: y_ };
  }

  clear() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawPolygons() {
    for (const p of this.polygons) {
      const flatCoords = Screen.project3Dto2D(p.x, p.y, p.z)
      const sCoords = this.worldToScreenCoords(flatCoords.x, flatCoords.y)
      p.drawOnScreenCoord(this.ctx, sCoords.x, sCoords.y, p.width, p.height)
    }
  }
}
