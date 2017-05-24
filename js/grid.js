class Grid {
	constructor (data) {
		this.goal = [];
		this.ans = [];
		for (let i = 0; i < lines; i++) {
			this.goal[i] = [];
			this.ans[i] = [];
			for (let j = 0; j < cols; j++) {
				this.goal[i][j] = (data[i][j] === '*') ? EMPTY : FULL;
				this.ans[i][j] = 0;

			}
		}
	}

	get mouseAt () {
		let h, w;
		[h, w] = this.cellSize;

		let l = floor(mouseY / h);
		let c = floor(mouseX / w);
		if (l < 0 || l >= linesView || c < 0 || c >= colsView) return [-1, -1];

		return [l + topLine, c + topCol];
	}


	get cellSize () {
		return [(height - 4) / linesView, (width - 4) / colsView];
	}

	show () {
		let [h, w] = this.cellSize;
		let bg = color(100);
		noStroke();
		// redraw the all thing
		background(255); // so no rect to draw for empty cell

		// draw all the background of black boxes
		fill(bg);
		for (let i = 0; i < linesView; i++) {
			let start = -1;
			for (let j = 0; j < colsView; j++) {
				if (this.goal[i + topLine][j + topCol] === EMPTY) {
					if (start != -1) {
						rect (start * w, i * h, w * (j - start), h);
						start = -1;
					}
				}
				else {
					if (start === -1) start = j;
				}
			}
			if (start != -1) {
				rect (start * w, i * h, w * (colsView - start), h);
			}
		}

		// draw a red square in every marked cell
		fill (255, 0, 0);
		let w_4 = floor(w/4), h_4 = floor(h/4), w_2 = floor(w/2), h_2 = floor(h/2);
		if (w_2 >= 1 && h_2 >= 1) {

			for (let i = 0; i < linesView; i++) {
				for (let j = 0; j < colsView; j++) {
					if (this.ans[i + topLine][j + topCol] > 0) {
						rect (j * w + w_4, i * h + h_4, w_2, h_2);
					}
				}
			}
		}
		stroke(150, 100);
		for (let i = 0; i <= linesView; i++) {
			let y = i * h;
			line (0, y, colsView * w, y);
		}

		for (let j = 0; j <= colsView; j++) {
			let x = j * w;
			line (x, 0, x, linesView * h);
		}
	}
}