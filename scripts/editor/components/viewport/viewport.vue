<script setup>
    import {ref, onMounted} from 'vue'
    import Engine from '../../../engine/engine'
    import {Graphics} from 'pixi.js'
    import {Container} from 'pixi.js'
    import ContextMenu from 'primevue/contextmenu'
    import {useViewportControls} from '../../use/use_viewport_controls'
    import Grid from '../../grid'
    import Viewport from '../../viewport'

    import Node2D from '../../../engine/nodes/node_2d'

    const viewportEl = ref(null);

    onMounted(() => {
        const engine = new Engine({
            parent: viewportEl.value,
            backgroundColor: 0xf5e8ce
        })

        const viewport = Viewport.fromElement(viewportEl.value)
        const editorUi = new Container()

        engine.stage.addChild(viewport.container)
        engine.stage.addChild(editorUi)

        const graphics = new Graphics()

        graphics.beginFill(0xFF0000)
        graphics.drawCircle(0, 0, 75)
        graphics.endFill()

        viewport.addChild(graphics)

        useViewportControls(viewport.container, viewportEl.value)

        const grid = new Grid()
        editorUi.addChild(grid.container)

        engine.ticker.add(() => {
            grid.update(viewport)
        })

        window.addEventListener('resize', (e) => {
            viewport.resize({
                width:  viewportEl.value.clientWidth,
                height: viewportEl.value.clientHeight
            })
        })

        const node = new Node2D()
    })


    const items = [
        { label: 'Action 1', icon: 'pi pi-fw pi-plus', command: () => { /* action */ } },
        { label: 'Action 2', icon: 'pi pi-fw pi-download', command: () => { /* action */ } },
    ]

    const menu = ref(null);

    function showMenu (event) {
        const rect = viewportEl.value.getBoundingClientRect()
        menu.value.toggle(event)
    }
</script>


<template>
    <div class="perky-engine-viewport">
        <div class="perky-engine-view" ref="viewportEl" @contextmenu.prevent="showMenu($event)"></div>
        <ContextMenu :model="items" ref="menu"></ContextMenu>
    </div>
</template>

