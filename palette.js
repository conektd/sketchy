class Palette {
  smoothingJitter = 0;

  constructor(keyColors) {
    this.keyColors = keyColors.map((c) => new BetterColor(color(c)));
    this.memo = new Map();
  }

  getKey(pos) {
    return this.keyColors[
      constrain(Math.floor(pos), 0, this.keyColors.length - 1)
    ];
  }

  getSmooth(pos) {
    if (this.memo.has(pos)) return this.memo.get(pos);
    const i = this._startIndex(pos);
    if (this.smoothingJitter != 0) pos *= random(this.smoothingJitter);
    const lerped = lerpColor(
      this.keyColors[i],
      this.keyColors[i + 1],
      this._amt(pos)
    );
    this.memo.set(pos, lerped);
    return lerped;
  }

  getRandom() {
    return this.getSmooth(random(1));
  }
  
  isReady() {
    return this.keyColors.length > 0;
  }

  _amt(pos) {
    return (pos * (this.keyColors.length - 1)) % 1;
  }

  _startIndex(pos) {
    const i = Math.floor(map(pos, 0, 1, 0, this.keyColors.length - 1));
    return constrain(i, 0, this.keyColors.length - 2);
  }
}

class BetterColor {
  _color;

  constructor(c) {
   this._color = c;
  }
  
  get levels() {
    return this._color.levels;
  }

  toString(format) {
    return this._color.toString(format);
  }

  setRed(newRed) {
   this._color.setRed(newRed);
  }

  setGreen(newGreen) {
    this._color.setGreen(newGreen);
  }

  setBlue(newBlue) {
    this._color.setBlue(newBlue);
  }

  setAlpha(newAlpha) {
    this._color.setAlpha(newAlpha);
  }
}
