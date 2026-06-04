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
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

