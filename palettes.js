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

const NAMED_PALETTES = [
  {
    name: "Benedictus",
    colors: ["#F27EA9", "#366CD9", "#5EADF2", "#636E73", "#F2E6D8"],
  },
  {
    name: "Cross",
    colors: ["#D962AF", "#58A6A6", "#8AA66F", "#F29F05", "#F26D6D"],
  },
  {
    name: "Demuth",
    colors: ["#222940", "#D98E04", "#F2A950", "#BF3E21", "#F2F2F2"],
  },
  {
    name: "Hiroshige",
    colors: ["#1B618C", "#55CCD9", "#F2BC57", "#F2DAAC", "#F24949"],
  },
  {
    name: "Hokusai",
    colors: ["#074A59", "#F2C166", "#F28241", "#F26B5E", "#F2F2F2"],
  },
  {
    name: "Hokusai Blue",
    colors: ["#023059", "#459DBF", "#87BF60", "#D9D16A", "#F2F2F2"],
  },
  {
    name: "Java",
    colors: ["#632973", "#02734A", "#F25C05", "#F29188", "#F2E0DF"],
  },
  {
    name: "Kandinsky",
    colors: ["#8D95A6", "#0A7360", "#F28705", "#D98825", "#F2F2F2"],
  },
  {
    name: "Monet",
    colors: ["#4146A6", "#063573", "#5EC8F2", "#8C4E03", "#D98A29"],
  },
  {
    name: "Nizami",
    colors: ["#034AA6", "#72B6F2", "#73BFB1", "#F2A30F", "#F26F63"],
  },
  {
    name: "Renoir",
    colors: ["#303E8C", "#F2AE2E", "#F28705", "#D91414", "#F2F2F2"],
  },
  {
    name: "VanGogh",
    colors: ["#424D8C", "#84A9BF", "#C1D9CE", "#F2B705", "#F25C05"],
  },
  {
    name: "Mono",
    colors: ["#D9D7D8", "#3B5159", "#5D848C", "#7CA2A6", "#262321"],
  },
  {
    name: "RiverSide",
    colors: ["#906FA6", "#025951", "#252625", "#D99191", "#F2F2F2"],
  },
];

for (const {colors} of NAMED_PALETTES) {
  PALETTES.push(colors);
}


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
