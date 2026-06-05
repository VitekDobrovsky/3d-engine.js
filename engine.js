import { Screen } from "./src/Screen.js"
import { Square } from "./src/Element.js";

const screen = new Screen(canvas)
const square = new Square(100, 100, 0, "#f08000", 200, 200)

const FPS = 60;
function mainLoopFrame() {
  screen.clear()
  square.draw(screen.ctx)
  square.x += 1

  setTimeout(mainLoopFrame, 1000 / FPS);
}

mainLoopFrame()
