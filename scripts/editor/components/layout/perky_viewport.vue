<script setup>
    import {ref, onMounted} from 'vue'
    import Engine from '../../../engine/engine'
    import {Graphics} from '@pixi/graphics'
    import ContextMenu from 'primevue/contextmenu'

    const viewport = ref(null);

    onMounted(() => {
        const engine = new Engine({parent: viewport.value})
        let graphics = new Graphics();

        graphics.beginFill(0xFF0000)
        graphics.drawCircle(0, 0, 75)
        graphics.endFill()

        engine.stage.addChild(graphics)

        window.engine = engine
    })


    const items = [
        { label: 'Action 1', icon: 'pi pi-fw pi-plus', command: () => { /* action */ } },
        { label: 'Action 2', icon: 'pi pi-fw pi-download', command: () => { /* action */ } },
    ]

    const menu = ref(null);

    function showMenu (event) {
        const rect = viewport.value.getBoundingClientRect()
        menu.value.toggle(event)
    }
</script>


<template>
    <div class="perky-engine-viewport">
        <div class="perky-engine-view" ref="viewport" @contextmenu.prevent="showMenu($event)"></div>
        <ContextMenu :model="items" ref="menu"></ContextMenu>
    </div>
</template>

