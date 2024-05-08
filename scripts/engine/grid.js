// Inspired by Toxilibs (toxicode.fr)

export default class Grid {

    constructor ({width, height}) {
        this.width = width
        this.height = height
        this.clear()
    }

    coordKey (x, y) {
        return x + y * this.width
    }

    isInside (x, y) {
        return (x >= 0 && y >= 0 && x < this.width && y < this.height)
    }

    getCell (x, y) {
        if (this.isInside(x, y)) {
            return this.cells[this.coordKey(x, y)]
        } else {
            return undefined
        }
    }

    forEachDefinedCell (iterator) {
        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i] !== undefined) {
                iterator(this.cells[i])
            }
        }
    }


    forEachDefinedCellWithCoords (iterator) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let cell = this.cells[this.coordKey(x, y)]
                if (cell !== undefined) {
                    iterator(cell, x, y)
                }
            }
        }
    }


    setCell (x, y, value) {
        if (this.isInside(x, y)) {
            this.cells[this.coordKey(x, y)] = value
            return true
        } else {
            return false
        }
    }

    clear () {
        this.cells = new Array(this.width * this.height)
    }

}
