import Rectangle from './rectangle'


export default class Dom extends Rectangle {

    static rendererName = 'Dom'

    constructor (params = {}) {
        super(params)

        this.isDom = true
        this.parentDom = null
        this.rootDom = this

        registerEvents(this)
    }


    get isRootDom () {
        return this.rootDom === this
    }


    get domElement () {
        return this.renderer && this.renderer.domElement
    }


    get parentDomElement () {
        return this.parentDom && this.parentDom.domElement
    }


    update (...args) {
        super.update(...args)

        const position = this.display.getGlobalPosition()
        this.domElement.style.left = `${position.x}px`
        this.domElement.style.top  = `${position.y}px`
    }

}

function getGlobalScale (element) {
    // Initialiser les échelles globales à 1
    let globalScaleX = 1
    let globalScaleY = 1
    
    // Parcourir les parents jusqu'à atteindre la racine
    while (element) {
        globalScaleX *= element.scale.x
        globalScaleY *= element.scale.y
        element = element.parent
    }
    
    return {scaleX: globalScaleX, scaleY: globalScaleY}
}


function registerEvents (node) {

    node.on('attached', () => {
        const parentDom = getParentDom(node)

        if (parentDom) {
            node.parentDom = parentDom
            node.rootDom   = getRootDom(parentDom)
        } else {
            node.parentDom = null
            node.rootDom   = node
        }
    })

    node.on('detached', () => {
        node.parentDom = null
        node.rootDom   = node
    })

}


function getParentDom (node) {
    if (node.parent) {
        return node.parent.isDom ? node.parent : getParentDom(node.parent)
    }

    return null
}


function getRootDom (node) {
    return node.parentDom ? getRootDom(node.parentDom) : node
}
