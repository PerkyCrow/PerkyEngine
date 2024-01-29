
export default class Asset {

    constructor ({name, path, source, ext, loader, type}) {
        this.name   = name
        this.path   = path
        this.source = source
        this.ext    = ext
        this.loader = loader
        this.type   = type
    }


    get loaded () {
        return typeof this.source !== 'undefined'
    }


    load () {
        if (this.loaded) {
            return Promise.resolve(this.source)
        }

        if (!this.loader) {
            return Promise.reject(new Error(`No loader for asset ${this.path}`))
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
