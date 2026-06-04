import { Screen } from "./src/Screen.js"

function dirtyCode() {
  const WIDTH = 800;
  const HEIGHT = 800;
  const ZK = 25;
  const FPS = 60;
  const MOVEMENT_SPEED = 0.1;

  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");
  clear();

  // draw on screen
  function clear() {
    ctx.fillStyle = "#222021";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "#f08000";
  }
  function drawPoint({ x, y, z }) {
    const tPoint = project({ x, y, z });
    const screenPoint = screenCoordinates({ x: tPoint.x, y: tPoint.y, scale: tPoint.scale });
    ctx.fillRect(screenPoint.x, screenPoint.y, screenPoint.scale, screenPoint.scale);
  }

  // 3d -> 2d
  function project({ x, y, z }) {
    // if (z <= 0) return null;
    const x_ = x / z;
    const y_ = y / z;

    const scale = ZK / z;

    return { x: x_, y: y_, scale: scale };
  }
  function screenCoordinates({ x, y, scale }) {
    // -1,1 => 0,W/H
    const x_ = ((x + 1) * WIDTH) / 2 - scale / 2;
    const y_ = ((-y + 1) * HEIGHT) / 2 - scale / 2;

    return { x: x_, y: y_, scale: scale };
  }

  // basic movement
  function movePoint({ x, y, z }, { mX, mY, mZ }) {
    return { x: x + mX, y: y + mY, z: z + mZ };
  }
  function translateZ({ x, y, z }, moveBy) {
    return { x, y, z: z + moveBy };
  }
  function rotateXZ({ x, y, z }, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);

    return {
      x: x * c - z * s,
      y,
      z: x * s + z * c,
    };
  }

  // complex movement
  function moveCube(cf) {
    const moveBy = cf / 100;
    const cube = [
      translateZ({ x: 0.5, y: 0.5, z: 0 }, moveBy),
      translateZ({ x: 0.5, y: -0.5, z: 0 }, moveBy),
      translateZ({ x: -0.5, y: -0.5, z: 0 }, moveBy),
      translateZ({ x: -0.5, y: 0.5, z: 0 }, moveBy),
      translateZ({ x: 0.5, y: 0.5, z: 0.5 }, moveBy),
      translateZ({ x: 0.5, y: -0.5, z: 0.5 }, moveBy),
      translateZ({ x: -0.5, y: -0.5, z: 0.5 }, moveBy),
      translateZ({ x: -0.5, y: 0.5, z: 0.5 }, moveBy),
    ];

    clear();
    for (point of cube) drawPoint(point);
  }
  function rotateCube(cf) {
    const angle = (2 * Math.PI * cf) / 100;
    const localCube = [
      { x: 0.5, y: 0.5, z: -0.5 },
      { x: 0.5, y: -0.5, z: -0.5 },
      { x: -0.5, y: -0.5, z: -0.5 },
      { x: -0.5, y: 0.5, z: -0.5 },
      { x: 0.5, y: 0.5, z: 0.5 },
      { x: 0.5, y: -0.5, z: 0.5 },
      { x: -0.5, y: -0.5, z: 0.5 },
      { x: -0.5, y: 0.5, z: 0.5 },
    ];

    clear();
    for (let point of localCube) {
      const rotated = rotateXZ(point, angle);

      const translated = {
        x: rotated.x,
        y: rotated.y,
        z: rotated.z + 2.25,
      };

      drawPoint(translated);
    }
  }
  function cubeInSpace({ camX, camY, camZ }) {
    const cube = [
      { x: 0.5, y: 0.5, z: 0.5 },
      { x: 0.5, y: -0.5, z: 0.5 },
      { x: -0.5, y: -0.5, z: 0.5 },
      { x: -0.5, y: 0.5, z: 0.5 },
      { x: 0.5, y: 0.5, z: 1.5 },
      { x: 0.5, y: -0.5, z: 1.5 },
      { x: -0.5, y: -0.5, z: 1.5 },
      { x: -0.5, y: 0.5, z: 1.5 },
    ];

    clear();
    for (let point of cube) {
      drawPoint(movePoint(point, { mX: -camX, mY: -camY, mZ: -camZ }));
    }
  }

  // frame loop
  let cf = 0;
  let camera = { camX: 0, camY: 0, camZ: 0 };

  function frame() {
    cubeInSpace(camera);

    // rotateCube(cf);
    // cf += 1
    setTimeout(frame, 1000 / FPS);
  }

  setTimeout(frame, 1000 / FPS);

  window.addEventListener("keydown", function (event) {
    if (event.key === "w") {
      camera.camZ += MOVEMENT_SPEED;
    } else if (event.key === "s") {
      camera.camZ -= MOVEMENT_SPEED;
    } else if (event.key === "a") {
      camera.camX -= MOVEMENT_SPEED;
    } else if (event.key === "d") {
      camera.camX += MOVEMENT_SPEED;
    } else if (event.key === "ArrowUp") {
      camera.camY += MOVEMENT_SPEED;
    } else if (event.key === "ArrowDown") {
      camera.camY -= MOVEMENT_SPEED;
    }
  });
}

// dirtyCode()
const screen = new Screen(canvas)

