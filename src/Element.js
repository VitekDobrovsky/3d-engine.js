export class Element {
  constructor(x, y, z, color) {
    this.x = x;
    this.y = y;
    this.z = z
    this.color = color
  }
}

export class Square extends Element {
  constructor(x, y, z, color, width, height) {
    super(x,y,z, color)
    this.width = width
    this.height = height
  }
  
  draw(ctx) {
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x + this.width, this.y)
    ctx.lineTo(this.x + this.width, this.y + this.height)
    ctx.lineTo(this.x, this.y + this.height)
    ctx.closePath()

    ctx.strokeStyle = this.color
    ctx.lineWidth = 2;
    ctx.stroke()
  }
}

