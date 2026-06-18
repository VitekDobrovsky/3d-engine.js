## TODO
- [x] Dirty one-file sketch
- [x] OOP Sketch
- [x] OOP
- [x] Matrices
  - [x] Create Matrix class
  - [x] Create Model Matrix
  - [x] 4D point instead of 3D
  - [x] Perspective projection matrix
- [x] Drawing architecture w/ animation loop
- [x] Fix rotating
- [x] Edges
- [x] Docs
- [x] Movement element loop
- [ ] Occlusion
- [ ] Dirty tag

## The vertex pipeline

4D point `(x, y, z, 1)` in its object's own local space to 2D pixel on the canvas:

```
local space  ──M──▶  world space  ──V──▶  camera space  ──P──▶  clip space  ──÷w──▶  NDC  ──viewport──▶  pixels
```

1. **Multiply by M (the model matrix)** — moves the vertex from the object's own local coordinates into the world.
2. **Multiply by V (the view matrix)** — repositions the world so the camera ends up at the origin. View matrix - *inverse* of the camera's own transform matrix.
3. **Multiply by P (the perspective projection matrix)** — projects camera space into clip space. Loads `-z` into the `w` component. `(x, y, z)` get scaled by the field of view and aspect ratio. The new `w` holds the vertex's distance from the camera.
4. **Divide `(x, y, z)` by `w`** — perspective foreshortening. Deeper vertices have a larger `w`. `(x, y, z) / w` - hyperbolic relation between distance and position towards middle of the screen.
5. **Viewport mapping** (in `Screen.worldToScreenCoords`) — NDC `[-1, 1]` to pixel coordinates `[0, width]`. `x = ((x + 1) * screenWidth) / 2`, `y = ((-y + 1) * screenHeight) / 2`

Vertices with `w ≤ 0` are behind the camera - skip them after step 3.

## Matrices used in the engine

Every matrix is 4×4. `c = cos(angle)`, `s = sin(angle)`.

#### Identity

The "do nothing" function. Every new `Matrix4` starts here.

```
[ 1  0  0  0 ]
[ 0  1  0  0 ]
[ 0  0  1  0 ]
[ 0  0  0  1 ]
```

#### Translation — `Matrix4.translation(tx, ty, tz)`

Identity with the translation tucked into the last column. The homogeneous `w=1` is what makes this work, since transition is not linear 
```
[ 1  0  0  tx ]
[ 0  1  0  ty ]
[ 0  0  1  tz ]
[ 0  0  0   1 ]
```

#### Rotation X — `Matrix4.rotationX(angle)`

X stays fixed. Y and Z rotate into each other.

```
[ 1  0   0  0 ]
[ 0  c  -s  0 ]
[ 0  s   c  0 ]
[ 0  0   0  1 ]
```

#### Rotation Y — `Matrix4.rotationY(angle)`

Y fixed. X and Z swap. The sign pattern is flipped vs. X and Z because of right-handed coordinates.

```
[  c  0  s  0 ]
[  0  1  0  0 ]
[ -s  0  c  0 ]
[  0  0  0  1 ]
```

#### Rotation Z — `Matrix4.rotationZ(angle)`

Z fixed. X and Y rotate. This is the classic 2D rotation embedded in the top-left.

```
[ c  -s  0  0 ]
[ s   c  0  0 ]
[ 0   0  1  0 ]
[ 0   0  0  1 ]
```

#### Scale — `Matrix4.scale(sx, sy, sz)`

Stretches each axis independently.

```
[ sx  0   0   0 ]
[ 0   sy  0   0 ]
[ 0   0   sz  0 ]
[ 0   0   0   1 ]
```

#### Perspective — `Matrix4.perspective(fovY, aspect, near, far)`

General form, where `f = 1 / tan(fovY/2)`:

```
[ f/aspect  0       0                       0                       ]
[ 0         f       0                       0                       ]
[ 0         0   (far+near)/(near-far)   (2·far·near)/(near-far)     ]
[ 0         0      -1                       0                       ]
```

This is the only matrix in the engine that is **not affine** — its last row is `[0 0 -1 0]` instead of `[0 0 0 1]`. That's what enables the `w = -z` trick: after multiplication, the homogeneous coordinate holds the depth, and dividing x/y/z by it produces the foreshortening that real perspective requires.

### Composed matrices (built every frame)

#### Model matrix — `Element.modelMatrix`

`T · Ry · Rz · Rx · ...`. The top-left 3×3 is the combined rotation, the last column is where the local origin lands in world space.

#### View matrix — `Camera.viewMatrix`

The _inverse_ of the camera's own transform — it shifts the whole world the opposite way so the camera ends up at the origin looking down `-Z`.

#### Combined matrix — `P · V · M`

Built once per element per frame in `Scene.draw`. Every vertex is multiplied by this single matrix instead of three. Regardless of how many transforms are composed, each vertex costs exactly 16 multiplies and 12 adds.
