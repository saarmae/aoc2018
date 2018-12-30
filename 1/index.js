const fs = require('fs');
const readline = require('readline');
const Set = require('collections/set');
const hirestime = require('hirestime');

const lineReader = readline.createInterface({
	input: fs.createReadStream('data.txt'),
});

let number = 0;
const changes = [];
const changesAsString = [];

lineReader
	.on('line', function(line) {
		changes.push(parseInt(line, 10));
		changesAsString.push(lineReader);
	})
	.on('close', () => {
		const getElapsed = hirestime();
		const answer = findDuplicateWithSetForOf();
		console.log(answer, getElapsed());
		const getElapsed2 = hirestime();
		const answer2 = findDuplicateWithArrayForOf();
		console.log(answer2, getElapsed2());
	});

function findDuplicateWithSetForOf() {
	number = 0;
	const states = new Set([0]);
	let previousStatesSize = -1;
	let duplicateFound = false;
	while (!duplicateFound) {
		for (var change of changes) {
			number += change;
			states.add(number);
			if (states.size === previousStatesSize) {
				duplicateFound = true;
				break;
			}
			previousStatesSize = states.size;
		}
	}
	return number;
}

function findDuplicateWithArrayForOf() {
	number = 0;
	const states = [0];
	let duplicateFound = false;
	while (!duplicateFound) {
		for (var change of changes) {
			number += change;
			if (states.includes(number)) {
				duplicateFound = true;
				break;
			}
			states.push(number);
		}
	}
	return number;
}
