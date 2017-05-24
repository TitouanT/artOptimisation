function keyPressed () {
	let useFull = false;
	let dl = max(floor(linesView / 10), 1);
	let dc = max(floor (colsView / 10), 1);
	key = key.toUpperCase();
	if (keyCode === ENTER) {
		saveSolution();
		return;
	}
	if (key === 'L') {
		console.clear();
		logSolution();
		return;
	}
	if (key === 'X') {
		useFull = true;
	}

	if (key === 'H') {
		consoleWelcome();
		return;
	}
	if (topLine > 0 && (key === 'W' || key === 'Z' || keyCode === UP_ARROW)) {
		topLine -= dl;
		if (topLine < 0) topLine = 0;
		useFull = true;
	}
	if (topLine + linesView < lines && (key === 'S'|| keyCode === DOWN_ARROW)) {
		topLine += dl;
		if (topLine + linesView > lines) topLine = lines - linesView;
		useFull = true;
	}

	if (topCol > 0 && (key === 'Q' || key === 'A' || keyCode === LEFT_ARROW)) {
		topCol -= dc;
		if (topCol < 0) topCol = 0;
		useFull = true;
	}
	if (topCol + colsView < cols && (key === 'D' || keyCode === RIGHT_ARROW)) {
		topCol += dc;
		if (topCol + colsView > cols) topCol = cols - colsView;
		useFull = true;
	}
	if (useFull) redraw();
	return true;

}

