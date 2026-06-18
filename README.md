# JavaScript 3D Engine • from scratch

3D renderer built in vanilla JS with no libraries — just a 2D canvas and math.

![Demo showcase](./media/demo-showcase.png)

## Demo

```bash
npx serve .
# or
python3 -m http.server
```

Controls: `WASD` to move, `↑ ↓` to go up/down.

## The vertex pipeline

Each vertex starts as a 4D homogeneous point `(x, y, z, 1)` in local object space and ends up as a pixel on the canvas:

```
local space  ──M──▶  world space  ──V──▶  camera space  ──P──▶  clip space  ──÷w──▶  NDC  ──viewport──▶  pixels
```

1. **Model matrix (M)** — moves the vertex from local coordinates into the world. Composed from translation × rotation matrices.
2. **View matrix (V)** — the *inverse* of the camera's own transform. Shifts the whole world so the camera sits at the origin looking down `-Z`.
3. **Projection matrix (P)** — projects camera space into clip space. Loads `-z` into the `w` component; scales `x` and `y` by field of view and aspect ratio.
4. **Perspective divide (`÷w`)** — divides `(x, y, z)` by `w`. Deeper vertices have a larger `w`, so they compress toward the center — this is foreshortening. Vertices with `w ≤ 0` are behind the camera and are skipped.
5. **Viewport mapping** — NDC `[-1, 1]` → pixel coordinates `[0, width]`: `x = ((x + 1) · W) / 2`, `y = ((-y + 1) · H) / 2`

Instead of multiplying each vertex by M, then V, then P separately, the three matrices are pre-multiplied into a single `P·V·M` matrix once per element per frame. Every vertex then costs exactly one matrix multiply.

## Matrices

Every matrix is 4×4. `c = cos(θ)`, `s = sin(θ)`.

| Matrix | Purpose |
|---|---|
| **Translation** | Last column `(tx, ty, tz)` — homogeneous `w=1` makes non-linear translation work |
| **Rotation X/Y/Z** | Standard axis-angle rotations; Y has a flipped sign pattern due to right-handed coords |
| **Scale** | Diagonal `(sx, sy, sz)` |
| **Perspective** | Only non-affine matrix — last row `[0 0 -1 0]` is what puts `-z` into `w` |

The perspective matrix in full, where `f = 1 / tan(fovY / 2)`:

```
[ f/aspect  0       0                     0                   ]
[ 0         f       0                     0                   ]
[ 0         0   (far+near)/(near-far)   (2·far·near)/(near-far) ]
[ 0         0      -1                     0                   ]
```

## Code structure

```
engine/
  Matrix.js   — Matrix4 class: construction, multiplication, all transform types
  Element.js  — Base Element, CubeElement, SquareElement
  Camera.js   — View matrix, translate/rotate
  Scene.js    — Holds elements + camera, runs the animation loop, projects + draws each frame
  Screen.js   — Canvas setup, viewport mapping, clear
demo.js       — Scene setup: cubes, ground plane, input handling
index.html    — Entry point
```
