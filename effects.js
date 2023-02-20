function noisify(intensity) {
	intensity = intensity ?? 15;
	loadPixels();
	let d = pixelDensity();
	let halfImage = 4 * (width * d) * (height * d);
	for (let i = 0; i < halfImage; i += 4) {
		const shift = random(-intensity, intensity);
		pixels[i] += shift;
		pixels[i+1] += shift;
		pixels[i+2] += shift;
	}
	updatePixels();
}
