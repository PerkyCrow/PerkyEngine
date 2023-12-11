<script setup>
    import Splitter from 'primevue/splitter'
    import SplitterPanel from 'primevue/splitterpanel'

    import LayoutTopBar from './layout/top_bar.vue'
    import LayoutLeftBar from './layout/left_bar.vue'
    import LayoutRightBar from './layout/right_bar.vue'
    import LayoutMainView from './layout/main_view.vue'
</script>


<template>
    <div class="editor">
        <Splitter layout="vertical" style="height: 100vh" :gutterSize="0">

            <SplitterPanel style="flex-basis: 2.75rem; overflow: visible; background-color: #3c3c3c;">
                <LayoutTopBar></LayoutTopBar>
            </SplitterPanel>

            <SplitterPanel style="flex-basis: calc(100vh - 2.75rem);">

                <Splitter :gutterSize="6">
                    <SplitterPanel :minSize="10" :size="15" style="background-color: #252526;">
                        <LayoutLeftBar></LayoutLeftBar>
                    </SplitterPanel>

                    <SplitterPanel :minSize="50" :size="70" style="background-color: #1e1e1e;">
                        <LayoutMainView></LayoutMainView>
                    </SplitterPanel>

                    <SplitterPanel :minSize="10" :size="15" style="background-color: #252526;">
                        <LayoutRightBar></LayoutRightBar>
                    </SplitterPanel>
                </Splitter>

            </SplitterPanel>

        </Splitter>
    </div>
</template>

