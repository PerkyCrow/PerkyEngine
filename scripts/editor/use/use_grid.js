import {Graphics} from '@pixi/graphics'
import {Container} from '@pixi/display'


export function useGrid (editorUi, viewport, viewportEl) {
    const gridContainer = new Container()
    const lines = new Graphics()

    gridContainer.addChild(lines)
    editorUi.addChild(gridContainer)


    function updateGrid () {
        const width = viewportEl.clientWidth
        const height = viewportEl.clientHeight
        const zoomLevel = viewport.scale.x
        
        const offsetX = viewport.x * zoomLevel
        const offsetY = viewport.y * zoomLevel
    
        lines.clear()

        let interval = 100 * zoomLevel


        lines.lineStyle(1, 0x000000, 0.1)

        for (let i = offsetX % interval; i < width; i += interval) {
            lines.moveTo(i, 0)
            lines.lineTo(i, height)
        }

        for (let j = offsetY % interval; j < height; j += interval) {
            lines.moveTo(0, j)
            lines.lineTo(width, j)
        }

        // make red horizontal line at y = 0
        lines.lineStyle(1, 0xbb4553, 1)
        lines.moveTo(0, offsetY)
        lines.lineTo(width, offsetY)

        // make green vertical line at x = 0
        lines.lineStyle(1, 0x86b23b, 1)
        lines.moveTo(offsetX, 0)
        lines.lineTo(offsetX, height)

    }


    setInterval(updateGrid, 6)

}