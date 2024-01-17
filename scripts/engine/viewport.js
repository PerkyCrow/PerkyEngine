
export default class Viewport {

    constructor ({
        container = createContainer()
    } = {}) {
        this.container = container

        if (!this.container.classList.contains('perky_view')) {
            this.container.classList.add('perky_view')
        }
    }

}


function createContainer () {
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.width = '100%'
    container.style.height = '100%'
    document.body.appendChild(container)

    return container
}
