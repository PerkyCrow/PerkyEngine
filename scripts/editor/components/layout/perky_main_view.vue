<script setup>
    import TabView from 'primevue/tabview'
    import TabPanel from 'primevue/tabpanel'
    import PerkyViewport from './perky_viewport.vue'
    import Splitter from 'primevue/splitter'
    import SplitterPanel from 'primevue/splitterpanel'
    import PerkyTopBar from './perky_top_bar.vue'
</script>


<template>
    <TabView>
        <TabPanel header="Scene">
            <Splitter layout="vertical" style="height: 100%" :gutterSize="0">
                <SplitterPanel style="flex-basis: calc(2.75em + 0px); overflow: visible; background-color: #3c3c3c;">
                    <PerkyTopBar></PerkyTopBar>
                </SplitterPanel>

                <SplitterPanel style="flex-basis: calc(100% - 2.75em);">
                    <PerkyViewport></PerkyViewport>
                </SplitterPanel>
            </Splitter>

        </TabPanel>
    </TabView>
</template>

