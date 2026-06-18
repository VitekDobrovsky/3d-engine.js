import { Matrix4 } from "./Matrix.js";

export class Camera {
  constructor(x, y, z) {
    this.position = [x, y, z];
    this.viewMatrix = Matrix4.translation(-x, -y, -z);
  }

  moveTo(x, y, z) {
    this.position = [x, y, z];
    this.viewMatrix = Matrix4.translation(-x, -y, -z);
  }

  translate(dx, dy, dz) {
    this.position[0] += dx;
    this.position[1] += dy;
    this.position[2] += dz;

    this.viewMatrix = Matrix4.translation(-this.position[0], -this.position[1], -this.position[2]);
  }
}
