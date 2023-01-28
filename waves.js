class AdditiveWaves {
	waves = [];
	
	add(wave) {
		this.waves.push(wave);
	}
	
	getY({x, phaseOffset}) {
		return this.waves.reduce((sum, wave) => sum + wave.getY({x, phaseOffset}), 0);
	}
}

class SineWave {
	amplitude;
	period;
	phase;
	
	constructor({amplitude, period, phase}) {
		this.amplitude = amplitude ?? 100;
		this.period = period ?? 100;
		this.phase = phase ?? 0;
	}
	
	getY({x, phaseOffset}) {
		phaseOffset = phaseOffset ?? 0;
		return sin(this.phase + phaseOffset + TWO_PI * x / this.period) * this.amplitude;
	}
}
