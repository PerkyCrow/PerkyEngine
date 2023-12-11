<script setup>
    import {ref, onMounted} from 'vue'
    import Engine from '../../../engine/engine'
    import {Graphics} from '@pixi/graphics'
    import {Container} from '@pixi/display'
    import ContextMenu from 'primevue/contextmenu'
    import {useViewportControls} from '../../use/use_viewport_controls'
    import {useRulers} from '../../use/use_rulers'

    const viewportEl = ref(null);

    onMounted(() => {
        const engine = new Engine({
            parent: viewportEl.value,
            backgroundColor: 0xf5e8ce
        })


        const viewport = new Container()
        const editorUi = new Container()

        engine.stage.addChild(viewport)
        engine.stage.addChild(editorUi)

        let graphics = new Graphics();

        graphics.beginFill(0xFF0000)
        graphics.drawCircle(0, 0, 75)
        graphics.endFill()

        viewport.addChild(graphics)

        useViewportControls(viewport, viewportEl.value)
        useRulers(editorUi, viewport, viewportEl.value)
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

