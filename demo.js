import { Screen } from "./engine/Screen.js";
import { CubeElement, SquareElement } from "./engine/Element.js";
import { Camera } from "./engine/Camera.js";
import { Scene } from "./engine/Scene.js";

const screen = new Screen(canvas);
const camera = new Camera(0, 0, 0);
const cube = new CubeElement(0, 1, -5, 2);
const cube2 = new CubeElement(-3, 1, -5, 1);
const cube3 = new CubeElement(3, 1, -5, 1, false);

const elements = [];

for (let x = -50; x < 50; x++) {
  for (let z = 50; z > -50; z--) {
    elements.push(new SquareElement(x, -2, z, 1));
  }
}

const scene = new Scene(camera, [...elements, cube, cube2, cube3]);

let translationSpeed = 0.1;
const keysDown = new Set();
document.addEventListener("keydown", (e) => keysDown.add(e.key));
document.addEventListener("keyup", (e) => keysDown.delete(e.key));

scene.startAnimationLoop(screen, 60, () => {
  const tVec = [0, 0, 0];
  if (keysDown.has("w")) tVec[2] = -translationSpeed;
  if (keysDown.has("s")) tVec[2] = translationSpeed;
  if (keysDown.has("a")) tVec[0] = -translationSpeed;
  if (keysDown.has("d")) tVec[0] = translationSpeed;
  if (keysDown.has("ArrowUp")) tVec[1] = translationSpeed;
  if (keysDown.has("ArrowDown")) tVec[1] = -translationSpeed;

  camera.translate(tVec[0], tVec[1], tVec[2]);
  cube.rotate("y", -0.01);

  cube2.rotate("y", 0.01);
  cube2.rotate("z", 0.01);

  cube3.rotate("y", -0.01);
  cube3.rotate("z", -0.01);
});
