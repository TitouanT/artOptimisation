let textFile;
let grid;
let solution;
let lineClicked;
let colClicked;

const lines = 600;
const cols = 800;
let topLine, topCol, linesView, colsView;



const EMPTY = 0;
const FULL = 1;

function preload() {
	textFile = loadStrings('./js/input_0.txt');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	topLine = topCol = 0;
	linesView = 10;
	colsView = 10;
	lineClicked = -1;
	colClicked = -1;
	solution = [];
	let junk;
	[junk, ...textFile] = textFile; // remove the first line

	grid = new Grid(textFile);

	textFile.splice(0); // we don't need textFile anymore
	updateView(0);
	noLoop();
	consoleWelcome();
}

function draw() {


	grid.show();

	let [mouseL, mouseC] = grid.mouseAt;
	// draw the selection
	if (lineClicked != -1 && colClicked != -1) {
		if (mouseL != -1 && mouseC != -1) {
			let [h, w] = grid.cellSize;

			fill (255, 102, 0, 100);
			stroke(255, 102, 0);
			let [line, col, dim] = findSquare (
				lineClicked - topLine,
				colClicked - topCol,
				mouseL - topLine,
				mouseC - topCol
			);
			rect (col * w, line * h, dim * w, dim * h);

		}
	}

	fill(0);
	noStroke();
	textSize(25);
	textFont('Courier New');
	text(`l: ${mouseL}\nc: ${mouseC}\ncmd: ${solution.length}`, 0, 50);

}

function windowResized () {
	resizeCanvas(windowWidth, windowHeight);
	updateView(0);
	redraw();
}


function mouseClicked () {
	let l, c;
	[l, c] = grid.mouseAt;
	if (l === -1 || c === -1) return;

	if (mouseButton === LEFT) {
		if (lineClicked === -1 || colClicked === -1) {
			lineClicked = l;
			colClicked = c;
		}
		else {

			let [line, col, dim] = findSquare(lineClicked, colClicked, l, c);
			let cmd = new Command (FILL, line, col, dim);

			if (cmd.valid && cmd.apply()) {
				solution.push(cmd);
			}

			lineClicked = colClicked = -1;
		}

	}

	else if (mouseButton === RIGHT) {
		let cmd = new Command (ERASE, l, c);
		if (cmd.apply())solution.push(cmd);
	}
	else if (mouseButton === CENTER) {
		if (solution.length > 0) {
			let cmd = solution.pop();
			cmd.undo();

		}
	}
	redraw();
	return false;
}


function saveSolution () {
	let arr = [];
	for (i = 0; i < solution.length; i++) {
		arr.push(solution[i].toString());
	}

	saveStrings(arr, "solution.txt");
}

function logSolution () {
	let arr = [];
	for (i = 0; i < solution.length; i++) {
		console.log(solution[i].toString());
	}
}

// find the (or one of them) smallest square who have A as a corner and B on a side
function findSquare (lineA, colA, lineB, colB) {
	// length of a side of that square
	let line, col;
	let dim = max(abs(lineA - lineB), abs(colA - colB));

	if (lineB >= lineA) line = lineA;
	else line = lineA - dim;

	if (colB >= colA) col = colA;
	else col = colA - dim;

	return [line, col, dim + 1];

}

function consoleWelcome () {
	console.clear();
	console.log(
`This GUI purpose is to help people find solution to this challenge:
	+ http://primers.xyz/0
The keyBoard command are:
	+ to move the window around:
		+ WASD
		+ ZQSD
		+ arrow keys
	+ X to redraw the screen
	+ L to Log your current solution
	+ H to show this message
	+ ENTER to save your current solution

And the mouse:
	+ left click:
		+ the first begin a selection
		+ the second end it, and all selected cell are marked
	+ right click to unmark a cell
	+ center click to undo action
	+ scroll to zoom In and Out`
	);
}
