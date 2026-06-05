import { Screen } from "./src/Screen.js"
import { Square } from "./src/Element.js";

const screen = new Screen(canvas)
const square = new Square(200, 200, 0, "#f08000", 200, 200)

square.draw(screen.ctx)
