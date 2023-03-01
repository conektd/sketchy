class Palette {
  smoothingJitter = 0;

  constructor(keyColors) {
    this.keyColors = keyColors.map((c) => color(c));
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

function setHSL(c, {h, s, l, a}) {
	push()
	colorMode(HSL, 360, 100, 100, 1);
	const newColor = color(
		h ?? hue(c),
		s ?? saturation(c),
		l ?? lightness(c),
		a ?? alpha(c),
	);
	pop();
	return newColor;
}

function offsetHSL(c, {h, s, l, a}) {
	push();
	colorMode(HSL, 360, 100, 100, 1);
	const newColor = color(
		h ? hue(c) + h : hue(c),
		s ? saturation(c) + s : saturation(c),
		l ? lightness(c) + l : lightness(c),
		a ? alpha(c) + a : alpha(c),
	);
	pop();
	return newColor;
}
