export class Element {
  constructor(x, y, z, color) {
    this.x = x;
    this.y = y;
    this.z = z
    this.color = color
  }
}

export class Square extends Element {
  constructor(x, y, z, color, width, height, screen) {
    super(x,y,z, color)
    this.width = width
    this.height = height
  
    screen.polygons.push(this)
  }
  
  drawOnScreenCoord(ctx, screenX, screenY, screenW, screenH) {
    ctx.beginPath()
    ctx.moveTo(screenX, screenY)
    ctx.lineTo(screenX + screenW, screenY)
    ctx.lineTo(screenX + screenW, screenY + screenH)
    ctx.lineTo(screenX, screenY + screenH)
    ctx.closePath()

    ctx.strokeStyle = this.color
    ctx.lineWidth = 2;
    ctx.stroke()
  }
}

