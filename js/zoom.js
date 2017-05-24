function mouseWheel (event) {
	let mouseL_old, mouseC_old;
	[mouseL_old, mouseC_old] = grid.mouseAt;
	if (mouseL_old === -1 || mouseC_old === -1) return false; // the mouse is not in the grid;

	let d = max(floor(linesView / 10), 1);
	d = (event.delta > 0) ? d : - d;

	if (updateView (d)) redraw();

	return false;
}

function updateView (d) {
	let mouseL_old, mouseC_old;
	[mouseL_old, mouseC_old] = grid.mouseAt;
	let linesView_old = linesView;
	let colsView_old = colsView;

	linesView += d;
	if (linesView < 2) linesView = 2;
	else if (linesView > lines) linesView = lines;

	colsView = floor(linesView * width / height);

	if (colsView === colsView_old && linesView === linesView_old) return false;
	if (d === 0 && colsView > cols) { // if the canvas has been resized
		colsView = cols;
		linesView = floor(colsView * height / width);
	}
	else if (colsView < 2 || colsView > cols) {
		colsView = colsView_old
		linesView = linesView_old;
		return false;
	}


	let mouseL, mouseC;
	[mouseL, mouseC] = grid.mouseAt;
	topLine += (mouseL_old - mouseL);
	topCol += (mouseC_old - mouseC);

	if (topLine + linesView > lines) topLine = lines - linesView;
	if (topCol + colsView > cols) topCol = cols - colsView;
	if (topLine < 0) topLine = 0;
	if (topCol < 0) topCol = 0;
	return true;
}
