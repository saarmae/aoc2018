const fs = require('fs');
const readline = require('readline');

const lineReader = readline.createInterface({
	input: fs.createReadStream('data.txt'),
});

let number = 0;

lineReader
	.on('line', function(line) {
		number += parseInt(line, 10);
	})
	.on('close', () => {
		console.log(number);
	});
