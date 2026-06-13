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
}
