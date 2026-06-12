import { Matrix4 } from "./Matrix.js";

export class Element {
  constructor(x,y,z) {
    this.modelMatrix = Matrix4.translation(x, y, z);
    this.vertices = [];
  }

  translate(tx, ty, tz) {
    this.modelMatrix.multiply(Matrix4.translation(tx, ty, tz));
  }

  rotate(axis, angle) {
    switch (axis) {
      case "x": this.modelMatrix.multiply(Matrix4.rotationX(angle)); break;
      case "y": this.modelMatrix.multiply(Matrix4.rotationY(angle)); break;
      case "z": this.modelMatrix.multiply(Matrix4.rotationZ(angle)); break;
    }
  }
}

export class PointElement extends Element {
  constructor(x, y, z) {
    super(x, y, z);
    this.vertices = [[0, 0, 0, 1]];
  }
}

export class CubeElment extends Element {
  constructor(x, y, z, size) {
    super(x, y, z);

    const s = size / 2;
    this.vertices = [
      [-s, -s, -s, 1],
      [ s, -s, -s, 1],
      [ s,  s, -s, 1],
      [-s,  s, -s, 1],
      [-s, -s,  s, 1],
      [ s, -s,  s, 1],
      [ s,  s,  s, 1],
      [-s,  s,  s, 1],
    ]
  }
}
