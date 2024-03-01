import Node2D from 'engine/nodes/node_2d'
import assets from 'engine/assets'


export default class Sidebar extends Node2D {

    constructor (params = {}) {
        super(params)
        this.position = {
            x: -6,
            y: -3.5
        }
    }

    onReady () {
        const sidebarTexture = assets.getResource('sidebar')
        const sidebarAspectRatio = sidebarTexture.aspectRatio
    
        this.create('Sprite', {
            texture: sidebarTexture,
            width: 7 * sidebarAspectRatio,
            height: 7,
            anchor: {
                x: 0.5,
                y: 0
            }
        })

        // this.create('Mushroom', {
        //     position: {
        //         x: 0,
        //         y: 1.5
        //     },
        //     scale: 0.75
        // })

        for (let i = 0; i < 7; i++) {
            this.create('Mushroom', {
                position: {
                    x: 0,
                    y: 1.25 + i * 0.9
                },
                scale: 0.65
            })
        }
    }

}
