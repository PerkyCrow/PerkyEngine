export default function draggable (node) {

    node.dragging = false
    node.mousePosition = {x: 0, y: 0}

    node.onDisplay('pointerdown', () => {
        node.dragging = true
        node.emit('drag:start')
    })

    node.onDisplay('pointerup', () => {
        if (node.dragging) {
            node.dragging = false
            node.position = node.mousePosition
            node.emit('drag:end')
        }
    })

    node.onDisplay('globalmousemove', (event) => {
        if (node.dragging) {
            node.mousePosition = node.localPositionFromEvent(event)
            node.position = node.mousePosition
            node.emit('drag:move')
        }
    })

}