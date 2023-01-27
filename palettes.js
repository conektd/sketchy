const PALETTES = [
  [
    '#348888',
    '#22BABB',
    '#9EF8EE',
    '#FA7F08',
    '#F24405',
  ],
  [
    '#520120',
    '#08403E',
    '#706513',
    '#B57114',
    '#962B09',
  ],
  [
    '#151F30',
    '#103778',
    '#0593A2',
    '#FF7A48',
    '#E3371E',
  ],
  [
    '#146152',
    '#44803F',
    '#B4CF66',
    '#FFEC5C',
    '#FF5A33',
  ],
  [
    '#5C4B51',
    '#8CBEB2',
    '#F2EBBF',
    '#F3B562',
    '#F06060',
  ],
];

class SmoothPalette {
  jitter = 0;
  
  constructor(colors) {
    this.colors = colors.map(c => color(c));
    this.memo = new Map();
  }
    
  get(pos) {
    if (this.memo.has(pos)) return this.memo.get(pos);
    const i = this._startIndex(pos);
    if (this.jitter != 0) pos *= random(this.jitter);
    const lerped = lerpColor(this.colors[i], this.colors[i+1], this._amt(pos));
    this.memo.set(pos, lerped);
    return lerped;
  }
  
  getRandom() {
    return this.get(random(1));
  }
  
  _amt(pos) {
        return (pos * (this.colors.length-1)) % 1;
  }
  
  _startIndex(pos) {
    const i = Math.floor(map(pos, 0, 1, 0, this.colors.length-1));
    return constrain(i, 0, this.colors.length-2);
  }
}
