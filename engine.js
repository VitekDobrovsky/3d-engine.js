import { Screen } from "./src/Screen.js";
import { Point } from "./src/Element.js";
import { Camera } from "./src/Camera.js";
import { Scene } from "./src/Scene.js";

const screen = new Screen(canvas);
const camera = new Camera(0, 0, 0);
const element = new Point(0.5, 0.5, 1);
const el2 = new Point(0, 0, 4);

const scene = new Scene(camera, [element, el2]);

scene.startAnimationLoop(screen, 60);
