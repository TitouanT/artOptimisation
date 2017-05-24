// my way of doing enum{FILL, ERASE}
const FILL = 0;
const ERASE = 1;

class Command {
	constructor (type, line, col, size = 1) {
		this.type = type;
		this.line = line;
		this.col = col;
		this.size = (type == FILL) ? size : 1;
		this.applied = false;
	}

	get valid () {
		switch (this.type) {
			case FILL:
				if (this.line + this.size >= lines || this.col + this.size >= cols) {
					return false;
				}
			case ERASE:
				if (this.line >= lines || this.cols >= cols || this.line < 0 || this.col < 0) {
					return false;
				}
				break;
			default: return false;
		}
		return true;
	}

	apply () {
		if (this.applied) return false;
		if (this.type === FILL) {
			let useFull = false;
			for (let i = 0; i < this.size && !useFull; i++) {
				for (let j = 0; j < this.size && !useFull; j++) {
					if (grid.ans[this.line + i][this.col + j] < 1) useFull = true;
				}
			}
			if (!useFull) return false;
			for (let i = 0; i < this.size; i++) {
				for (let j = 0; j < this.size; j++) {
					grid.ans[this.line + i][this.col + j] = max(grid.ans[this.line + i][this.col + j] + 1, 1);
				}
			}
		}
		else {
			if (grid.ans[this.line][this.col] > 0) grid.ans[this.line][this.col] *= -1;
			else return false;
		}

		this.applied = true;
		return true;
	}

	undo () {
		if (!this.applied) return;
		if (this.type === FILL) {
			for (let i = 0; i < this.size; i++) {
				for (let j = 0; j < this.size; j++) {
					grid.ans[this.line + i][this.col + j]--;
				}
			}
		}
		else {
			grid.ans[this.line][this.col] *= -1;
		}
	}

	toString () {
		switch (this.type) {
			case FILL: return `FILL ${this.col} ${this.line} ${this.size}`;
			case ERASE: return `ERASE ${this.col} ${this.line}`;
		}
		return null;
	}
}