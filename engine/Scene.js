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
    for (const el of this.elements) {
      const mVp = new Matrix4().multiply(vp).multiply(el.modelMatrix);
  
      const projected = el.vertices.map(v => {
        const [cx, cy, _, cw] = mVp.multiplyVec4(v);
        return { x: cx / cw, y: cy / cw, cw };
      });

      // points
      if (el.showPoints) {
        screen.ctx.fillStyle = "#008000";
        for (const p of projected) {
          if (p.cw <= 0) continue;
          const s = screen.worldToScreenCoords(p.x, p.y, 0.5 / p.cw, 0.5 / p.cw);
          screen.ctx.fillRect(s.x, s.y, s.width, s.height);
        }
      }

      // edges
      if (!el.edges) continue;
      screen.ctx.strokeStyle = "#008000";
      for (const [a, b] of el.edges) {
        if (projected[a].cw <= 0 || projected[b].cw <= 0) continue;
        const sa = screen.worldToScreenCoords(projected[a].x, projected[a].y, 0, 0);
        const sb = screen.worldToScreenCoords(projected[b].x, projected[b].y, 0, 0);
        screen.ctx.beginPath();
        screen.ctx.moveTo(sa.x, sa.y);
        screen.ctx.lineTo(sb.x, sb.y);
        screen.ctx.stroke();
      }
    }
  }

  startAnimationLoop(screen, fps) {
    this.draw(screen);
    
    setTimeout(() => this.startAnimationLoop(screen, fps), 1000 / fps);
  }
}
