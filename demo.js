import { Screen } from "./engine/Screen.js";
import { CubeElement } from "./engine/Element.js";
import { Camera } from "./engine/Camera.js";
import { Scene } from "./engine/Scene.js";

const screen = new Screen(canvas);
const camera = new Camera(0, 0, 0);
const cube = new CubeElement(0, 1, -5, 2);
const cube2 = new CubeElement(-3, 1, -5, 1);
const cube3 = new CubeElement(3, 1, -5, 1);

const elements = [];

for (let x = -50; x < 50; x++) {
  for (let z = 0; z > -50; z--) {
    elements.push(
      new CubeElement(x, -2, z, 1, undefined, [
        [2, 3],
        [6, 7],
        [2, 6],
        [3, 7],
      ]),
    );
  }
}

const scene = new Scene(camera, [...elements, cube, cube2, cube3]);

scene.startAnimationLoop(screen, 60, () => {
  cube.rotate("y", -0.01);

  cube2.rotate("y", 0.01);
  cube2.rotate("z", 0.01);

  cube3.rotate("y", -0.01);
  cube3.rotate("z", -0.01);
});

