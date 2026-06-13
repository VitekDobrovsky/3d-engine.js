import { Screen } from "./engine/Screen.js";
import { CubeElement } from "./engine/Element.js";
import { Camera } from "./engine/Camera.js";
import { Scene } from "./engine/Scene.js";

const screen = new Screen(canvas);
const camera = new Camera(0, 0, 0);
const cube = new CubeElement(0, 0, -3, 2);

cube.rotate("y", Math.PI / 5);
cube.rotate("z", Math.PI / 10);

const scene = new Scene(camera, [cube]);

scene.startAnimationLoop(screen, 60);
