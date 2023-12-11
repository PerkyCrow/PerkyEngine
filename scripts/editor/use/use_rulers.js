import {Graphics} from '@pixi/graphics'
import {Container} from '@pixi/display'


export function useRulers (editorUi, viewport, viewportEl) {
    const rulersContainer = new Container()

    const horizontalRuler = new Graphics()
    const verticalRuler = new Graphics()
    const textContainer = new Container()

    rulersContainer.addChild(horizontalRuler)
    rulersContainer.addChild(verticalRuler)
    rulersContainer.addChild(textContainer)
    editorUi.addChild(rulersContainer)


    function updateRulers () {
        const width = viewportEl.clientWidth
        const height = viewportEl.clientHeight
        const zoomLevel = viewport.scale.x
        const offsetX = -viewport.x * zoomLevel
        const offsetY = -viewport.y * zoomLevel
    
        horizontalRuler.clear()
        verticalRuler.clear()
        textContainer.removeChildren()

        let interval = 100 * zoomLevel


        horizontalRuler.lineStyle(1, 0x000000, 1)
        for (let i = offsetX % interval; i < width; i += interval) {
            horizontalRuler.moveTo(i, 0)
            horizontalRuler.lineTo(i, 12)

            // const realPosition = (i - offsetX) / zoomLevel
        }

        verticalRuler.lineStyle(1, 0x000000, 1)
        for (let j = offsetY % interval; j < height; j += interval) {
            verticalRuler.moveTo(0, j)
            verticalRuler.lineTo(12, j)

            // const realPosition = (j - offsetY) / zoomLevel
        }

    }



    setInterval(updateRulers, 6)

}


