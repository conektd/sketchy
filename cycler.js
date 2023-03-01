class Cycler {
	items;
	_index;
	
	constructor(items) {
		this.items = items;
		this._index = floor(random(items.length));
	}
	
	current() {
		return this.items[this._index];
	}
	
	next() {
		this._stepIndex();
		return this.current();
	}
	
	_stepIndex() {
		this._index = this._index === this.items.length-1 ? 0 : this._index + 1;
	}
}
