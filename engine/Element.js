import { Matrix4 } from "./Matrix.js";

export class Element {
  constructor(x,y,z,color="#008000") {
    this.modelMatrix = Matrix4.translation(x, y, z);
    this.vertices = [];
    this.color = color;
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

export class CubeElement extends Element {
  constructor(x, y, z, size, color) {
    super(x, y, z, color);

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

    this.edges = [
      [0,1],[1,2],[2,3],[3,0],
      [4,5],[5,6],[6,7],[7,4],
      [0,4],[1,5],[2,6],[3,7],
    ];
  }
}
