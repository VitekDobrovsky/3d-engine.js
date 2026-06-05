import { Screen } from "./src/Screen.js"
import { Square } from "./src/Element.js";

const screen = new Screen(canvas)
const square = new Square(0, 0, 1, "#f08000", 100, 100, screen)

screen.drawPolygons()


