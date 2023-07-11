export function randomColorWithProbability() {
	const config = [
		{ r: "255", g: "255", b: "255", w: 50 }, // white
		{ r: "212", g: "253", b: "255", w: 10 }, // cyan
		{ r: "255", g: "192", b: "159", w: 15 }, // red
		{ r: "255", g: "255", b: "212", w: 25 }, // yellow
	];

	let choices = [];
	let probabilities = [];

	for (let i = 0; i < config.length; i++) {
		let color = config[i];
		choices.push(color);
		probabilities.push(color.w);
	}

	const selectedColor = randomChoiceWithProbability(choices, probabilities);
	//return { r: selectedColor.r, g: selectedColor.g, b: selectedColor.b };
	return [
		selectedColor.r / 255,
		selectedColor.g / 255,
		selectedColor.b / 255,
	];
}

function randomChoiceWithProbability(choices, probabilities) {
	var totalWeight = probabilities.reduce((a, b) => a + b, 0);
	var random = Math.random() * totalWeight;
	var cumulativeProbability = 0;

	for (var i = 0; i < choices.length; i++) {
		cumulativeProbability += probabilities[i];
		if (random < cumulativeProbability) {
			return choices[i];
		}
	}

	return choices[choices.length - 1];
}
