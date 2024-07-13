/**
 * Represents a grid in a 2D space.
 */
class Grid {
    /**
     * Constructor for a Grid object.
     * @param {number} cellWidth - The width of each cell in the grid.
     * @param {number} cellHeight - The height of each cell in the grid.
     */
    constructor({ cellWidth, cellHeight }) {
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;

        this.reset();
    }

    /**
     * This method gets called on init and when the window is resized to recalculate all grid dimensions.
     */
    reset() {
        let [cols, rows] = this._calculateGridCellDimensions();
        this.cols = cols;
        this.rows = rows;

        this._resizeGrid();
    }

    /**
     * Recalculates the grid width and height based on the number of number of columns/rows and the cell width/height.
     * Also recalculates the offset to the edges of the canvas.
     * @private
     */
    _resizeGrid() {
        this.width = this.cols * this.cellWidth;
        this.height = this.rows * this.cellHeight;

        this.offsetX = Math.floor((windowWidth - this.width) / 2);
        this.offsetY = Math.floor((windowHeight - this.height) / 2);
    }

    /**
     * Calculates the cell dimensions (columns and rows) of the grid based on the window width and height, and the cell width and height.
     * @private
     * @returns {number[]} An array containing the number of cells in the X and Y directions.
     */
    _calculateGridCellDimensions() {
        const cellsX = Math.floor(windowWidth / this.cellWidth);
        const cellsY = Math.floor(windowHeight / this.cellHeight);
        return [cellsX, cellsY];
    }

    /**
     * Resizes the cell dimensions of the grid.
     * @param {number} newCellWidth - The new width of each cell.
     * @param {number} newCellHeight - The new height of each cell.
     */
    resizeCellDimensions(newCellWidth, newCellHeight) {
        this.cellWidth = newCellWidth;
        this.cellHeight = newCellHeight;

        this.reset();
    }
}