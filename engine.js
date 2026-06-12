import { Screen } from "./src/Screen.js";
import { Element } from "./src/Element.js";
import { Camera } from "./src/Camera.js";
import { Matrix4 } from "./src/Matrix.js";

const screen = new Screen(canvas);
const camera = new Camera(0, 0, 0);
const projectionMatrix = Matrix4.perspective(Math.PI / 2, 1, 0.1, 100);
const element = new Element(1, 1, 1, "#008000");

const mVp = new Matrix4().multiply(projectionMatrix).multiply(camera.viewMatrix).multiply(element.modelMatrix);
const [cx, cy, cz, cw] = mVp.multiplyVec4([0, 0, 0, 1]);

const ndcX = cx / cw;
const ndcY = cy / cw;

const sCoords = screen.worldToScreenCoords(ndcX, ndcY, 0.5 / cw, 0.5 / cw);

screen.ctx.fillStyle = element.color;
screen.ctx.fillRect(sCoords.x, sCoords.y, sCoords.width, sCoords.height);
