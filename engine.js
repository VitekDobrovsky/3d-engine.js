import { Screen } from "./src/Screen.js";
import { CubeElment } from "./src/Element.js";
import { Camera } from "./src/Camera.js";
import { Scene } from "./src/Scene.js";

const screen = new Screen(canvas);
const camera = new Camera(0, 0, 0);
const cube = new CubeElment(0, 0, -3, 2);

cube.rotate("y", Math.PI / 5);
cube.rotate("z", Math.PI / 10);

const scene = new Scene(camera, [cube]);

scene.startAnimationLoop(screen, 60);
