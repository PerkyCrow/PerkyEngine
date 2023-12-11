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


        let isDraggable = true
        let isDragging  = false
        let lastX = engine.stage.x
        let lastY = engine.stage.y



        function startDrag (event) {
            if (event.button === 1 && isDraggable) {
                isDragging = true
                lastX = event.offsetX
                lastY = event.offsetY
            }
        }


        function drag (event) {
            if (isDragging) {
                const deltaX = event.offsetX - lastX
                const deltaY = event.offsetY - lastY

                lastX = event.offsetX
                lastY = event.offsetY

                engine.stage.x += deltaX
                engine.stage.y += deltaY
                console.log(engine.stage.x)
            }
        }


        function stopDrag () {
            isDragging = false
        }


        engine.view.addEventListener('mousedown', startDrag)
        engine.view.addEventListener('mousemove', drag)
        engine.view.addEventListener('mouseup',   stopDrag)


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

