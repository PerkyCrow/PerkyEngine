<script setup>
    import TabView from 'primevue/tabview'
    import TabPanel from 'primevue/tabpanel'
    import PerkyViewport from './perky_viewport.vue'
</script>


<template>
    <TabView>
        <TabPanel header="Scene">
            <PerkyViewport></PerkyViewport>
        </TabPanel>
    </TabView>
</template>

