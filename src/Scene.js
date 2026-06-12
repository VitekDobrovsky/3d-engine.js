import { Matrix4 } from "./Matrix.js";

export class Scene {
  constructor(camera, elements) {
    this.elements = elements;
    this.camera = camera;
    this.projectionMatrix = Matrix4.perspective(Math.PI / 2, 1, 0.1, 100);
  }

  draw(screen) {
    screen.clear();

    const vp = new Matrix4().multiply(this.projectionMatrix).multiply(this.camera.viewMatrix);
    for (const element of this.elements) {
      const mVp = new Matrix4().multiply(vp).multiply(element.modelMatrix);
      const [cx, cy, _, cw] = mVp.multiplyVec4([0, 0, 0, 1]);

      const ndcX = cx / cw;
      const ndcY = cy / cw;

      const sCoords = screen.worldToScreenCoords(ndcX, ndcY, 0.5 / cw, 0.5 / cw);

      screen.ctx.fillStyle = "#008000";
      screen.ctx.fillRect(sCoords.x, sCoords.y, sCoords.width, sCoords.height);
    }
  }

  startAnimationLoop(screen, fps) {
    this.draw(screen);
    
    setTimeout(() => this.startAnimationLoop(screen, fps), 1000 / fps);
  }
}
