
export default class Asset {

    constructor ({path, source, ext, loader}) {
        this.path   = path
        this.source = source
        this.ext    = ext
        this.loader = loader
    }


    get loaded () {
        return typeof this.source !== 'undefined'
    }


    load () {
        if (this.loaded) {
            return Promise.resolve(this.source)
        }

        return this.loader.load(this.path).then(source => {
            this.source = source
            return this.source
        })
    }


    reload () {
        return this.loader.load(this.path).then(source => {
            this.source = source
            return this.source
        })
    }

}
