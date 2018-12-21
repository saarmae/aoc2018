const fs = require('fs');
const readline = require('readline');
const Set = require('collections/set');

const lineReader = readline.createInterface({
	input: fs.createReadStream('data.txt'),
});

let number = 0;
const changes = [];

lineReader
	.on('line', function(line) {
		changes.push(parseInt(line, 10));
	})
	.on('close', () => {
		console.log(findDuplicate());
	});

function findDuplicate() {
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
