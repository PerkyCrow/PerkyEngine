<script setup>
    import TabView from 'primevue/tabview'
    import TabPanel from 'primevue/tabpanel'
    import Splitter from 'primevue/splitter'
    import SplitterPanel from 'primevue/splitterpanel'

    import Viewport from '../viewport/viewport.vue'
    import ToolBar from '../viewport/tool_bar.vue'
</script>


<template>
    <TabView>
        <TabPanel header="Scene">
            <Splitter layout="vertical" style="height: 100%" :gutterSize="0">
                <SplitterPanel style="flex-basis: calc(2.75em + 0px); overflow: visible; background-color: #3c3c3c;">
                    <ToolBar></ToolBar>
                </SplitterPanel>

                <SplitterPanel style="flex-basis: calc(100% - 2.75em);">
                    <Viewport></Viewport>
                </SplitterPanel>
            </Splitter>

        </TabPanel>
    </TabView>
</template>

