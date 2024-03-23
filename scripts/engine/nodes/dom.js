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
