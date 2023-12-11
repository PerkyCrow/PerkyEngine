export function useViewportControls (container, view) {

    let initialized = false
    let isDraggable = true
    let isDragging  = false
    let lastX       = container.x
    let lastY       = container.y


    function startDrag (event) {
        if (event.button === 1 && isDraggable) {
            isDragging = true
            lastX = event.offsetX
            lastY = event.offsetY
        }
    }


    function drag (event) {
        if (isDragging) {
            const deltaX = event.offsetX - lastX
            const deltaY = event.offsetY - lastY

            lastX = event.offsetX
            lastY = event.offsetY

            container.x += deltaX
            container.y += deltaY
        }
    }


    function stopDrag () {
        isDragging = false
    }


    function onWheel (event) {
        event.preventDefault()

        const zoomSpeed = 0.1
        const zoomFactor = 1 + (event.deltaY > 0 ? -zoomSpeed : zoomSpeed)

        container.scale.x *= zoomFactor
        container.scale.y *= zoomFactor

        const mouseX = event.offsetX
        const mouseY = event.offsetY
        container.x -= (mouseX - container.x) * (zoomFactor - 1)
        container.y -= (mouseY - container.y) * (zoomFactor - 1)
    }


    view.addEventListener('wheel',     onWheel)
    view.addEventListener('mousedown', startDrag)
    view.addEventListener('mousemove', drag)
    view.addEventListener('mouseup',   stopDrag)


    function init () {
        if (initialized) {
            return
        }

        view.addEventListener('wheel',     onWheel)
        view.addEventListener('mousedown', startDrag)
        view.addEventListener('mousemove', drag)
        view.addEventListener('mouseup',   stopDrag)

        initialized = true
    }


    function destroy () {
        if (!initialized) {
            return
        }

        view.removeEventListener('wheel',     onWheel)
        view.removeEventListener('mousedown', startDrag)
        view.removeEventListener('mousemove', drag)
        view.removeEventListener('mouseup',   stopDrag)

        initialized = false
    }


    container.on('destroyed', destroy)

    init()

}
