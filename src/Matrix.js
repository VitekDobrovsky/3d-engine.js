export class Matrix4 {
  constructor() {
      this.elements = new Float32Array(16);
      this.identity();
  }

  identity() {
    this.elements.set([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
    return this;
  }

  multiply(matB) {
    const a = this.elements;
    const b = matB.elements;
    const result = new Float32Array(16);
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        let sum = 0;
        for (let k = 0; k < 4; k++) {
          sum += a[r * 4 + k] * b[k * 4 + c];
        }
        result[r * 4 + c] = sum;
      }
    }
    
    this.elements = result;
    return this;
  }
    
  multiplyVec4(vec) {
    const m = this.elements;
    const [x, y, z, w] = vec;
    return [
      m[0]*x  + m[1]*y  + m[2]*z  + m[3]*w,
      m[4]*x  + m[5]*y  + m[6]*z  + m[7]*w,
      m[8]*x  + m[9]*y  + m[10]*z + m[11]*w,
      m[12]*x + m[13]*y + m[14]*z + m[15]*w,
    ];
  }

  static translation(tx, ty, tz) {
    const m = new Matrix4();
    m.elements[3]  = tx;
    m.elements[7]  = ty;
    m.elements[11] = tz;
    return m;
  }

  static rotationX(angle) {
    const m = new Matrix4();
    const c = Math.cos(angle), s = Math.sin(angle);
    m.elements[5]  =  c;  m.elements[6]  = -s;
    m.elements[9]  =  s;  m.elements[10] =  c;
    return m;

  }

  static rotationY(angle) {
    const m = new Matrix4();
    const c = Math.cos(angle), s = Math.sin(angle);
    m.elements[0]  =  c;  m.elements[2]  =  s;
    m.elements[8]  = -s;  m.elements[10] =  c;
    return m;
  }

  static rotationZ(angle) {
    const m = new Matrix4();
    const c = Math.cos(angle), s = Math.sin(angle);
    m.elements[0]  =  c;  m.elements[1]  = -s;
    m.elements[4]  =  s;  m.elements[5]  =  c;
    return m;
  }

  static scale(sx, sy, sz) {
    const m = new Matrix4();
    m.elements[0]  = sx;
    m.elements[5]  = sy;
    m.elements[10] = sz;
    return m;
  }

  static perspective(fovY, aspect, near, far) {
    const m = new Matrix4();
    m.elements.fill(0);
    const f = 1 / Math.tan(fovY / 2);
    m.elements[0]  = f / aspect;
    m.elements[5]  = f;
    m.elements[10] = (far + near) / (near - far);
    m.elements[11] = (2 * far * near) / (near - far);
    m.elements[14] = -1;
    m.elements[15] = 0;
    return m;
  }
}
