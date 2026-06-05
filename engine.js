import { Screen } from "./src/Screen.js"
import { Square } from "./src/Element.js";

const screen = new Screen(canvas)
const square = new Square(-0.5, 0.3, 1, "#f08000", 1, 1, screen)


screen.startFrameLoop(60, () => {
  screen.clear()
  screen.drawPolygons()
  square.z += 0.01
})
