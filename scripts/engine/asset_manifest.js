import Asset from './asset'
import {getUrlExt} from './utils'
import httpLoader from './loaders/http_loader'
import imageLoader from './loaders/image_loader'
import jsonLoader from './loaders/json_loader'
import textLoader from './loaders/text_loader'
import textureLoader from './loaders/texture_loader'


AssetManifest.setLoader(httpLoader)
AssetManifest.setLoader(imageLoader)
AssetManifest.setLoader(jsonLoader)
AssetManifest.setLoader(textLoader)
AssetManifest.setLoader(textureLoader)


export default class AssetManifest {

    static loaders = {}
    static extensions = {}


    constructor () {
        this.assets = {}
    }


    get (name) {
        return this.assets[name]
    }


    getSource (name) {
        const asset = this.get(name)
        return asset && asset.source
    }


    loadAll (filter = () => true) {
        const assets = Object.values(this.assets).filter(asset => !asset.loaded).filter(filter)

        return Promise.all(assets.map(asset => asset.load()))
    }


    add (params) {
        const assetParams = prepareAssetParams(this, params)

        if (isValidAssetParams(assetParams)) {
            let asset = new Asset(assetParams)
            this.assets[asset.name] = asset

            return asset
        }

        return null
    }


    reload (asset) {
        return asset.reload()
    }


    serialize () {
        return Object.values(this.assets).map(asset => {
            return {
                path: asset.path,
                name: asset.name,
                type: asset.type
            }
        })
    }


    static setLoader (loader) {
        this.loaders[loader.type] = loader

        for (let ext of loader.extensions) {
            this.extensions[ext] = loader
        }
    }


    static getLoader (typeOrExt) {
        return this.loaders[typeOrExt] || this.getLoaderByExtension(typeOrExt)
    }


    static getLoaderByExtension (ext) {
        return this.extensions[ext]
    }

}


function prepareAssetParams (manifest, params) {
    const assetParams = Object.assign({
        options: {}
    }, typeof params === 'string' ? {
        path: params,
        name: params
    } : params)

    setAssetExt(assetParams)
    setAssetLoader(manifest, assetParams)
    setAssetType(assetParams)
    setAssetName(assetParams)

    return assetParams
}


function setAssetExt (params) {
    if (params.path && !params.ext) {
        params.ext = getUrlExt(params.path)
    }
}


function setAssetLoader (manifest, params) {
    if (!params.loader && params.path) {
        params.loader = manifest.constructor.getLoader(params.type || params.ext)
    }
}



function setAssetType (params) {
    if (!params.type && params.loader) {
        params.type = params.loader.type
    }
}


function setAssetName (params) {
    if (!params.name && params.path) {
        params.name = params.path
    }
}


function isValidAssetParams (params) {
    return params.name && params.type && (params.path || params.source)
}
