import { Matrix4 } from "./Matrix.js";

export class Element {
  constructor(x, y, z, color) {
    this.modelMatrix = Matrix4.translation(x, y, z);

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
