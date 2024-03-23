import {Graphics} from 'pixi.js'
import {Container} from 'pixi.js'

import Grid from '../grid'

export function useGrid (editorUi, viewport, viewportEl) {

    const grid = new Grid()

    editorUi.addChild(grid.container)


    function updateGrid () {

        grid.update({
            x: viewport.x,
            y: viewport.y,
            width: viewportEl.clientWidth,
            height: viewportEl.clientHeight,
            scale: viewport.scale.x
        })

    }


    setInterval(updateGrid, 6)

}