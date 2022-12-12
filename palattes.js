const PALETTES = [
  [
    color('#348888'),
    color('#22BABB'),
    color('#9EF8EE'),
    color('#FA7F08'),
    color('#F24405'),
  ],
  [
    color('#520120'),
    color('#08403E'),
    color('#706513'),
    color('#B57114'),
    color('#962B09'),
  ],
  [
    color('#151F30'),
    color('#103778'),
    color('#0593A2'),
    color('#FF7A48'),
    color('#E3371E'),
  ],
  [
    color('#146152'),
    color('#44803F'),
    color('#B4CF66'),
    color('#FFEC5C'),
    color('#FF5A33'),
  ],
  [
    color('#5C4B51'),
    color('#8CBEB2'),
    color('#F2EBBF'),
    color('#F3B562'),
    color('#F06060'),
  ],
];

export class SmoothPalette {
	jitter = 0;
	
	constructor(colors) {
		this.colors = colors;
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
		return Math.floor(map(pos, 0, 1, 0, this.colors.length-1));
	}
}
