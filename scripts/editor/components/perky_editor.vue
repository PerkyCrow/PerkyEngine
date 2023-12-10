<script setup>
    import Splitter from 'primevue/splitter';
    import SplitterPanel from 'primevue/splitterpanel';
    import PerkyToolBar from './layout/perky_tool_bar.vue';
    import PerkyLeftBar from './layout/perky_left_bar.vue';
    import PerkyRightBar from './layout/perky_right_bar.vue';
    import PerkyMainView from './layout/perky_main_view.vue';
</script>


<template>
    <div class="editor">
        <Splitter layout="vertical" style="height: 100vh" :gutterSize="0">

            <SplitterPanel style="flex-basis: calc(3.25em + 0px); overflow: visible; background-color: #3c3c3c;">
                <PerkyToolBar></PerkyToolBar>
            </SplitterPanel>

            <SplitterPanel style="flex-basis: calc(100vh - 3.25em);">

                <Splitter :gutterSize="6">
                    <SplitterPanel :minSize="10" :size="20" style="background-color: #252526;">
                        <PerkyLeftBar></PerkyLeftBar>
                    </SplitterPanel>

                    <SplitterPanel :minSize="40" :size="60" style="background-color: #1e1e1e;">
                        <PerkyMainView></PerkyMainView>
                    </SplitterPanel>

                    <SplitterPanel :minSize="10" :size="20" style="background-color: #252526;">
                        <PerkyRightBar></PerkyRightBar>
                    </SplitterPanel>
                </Splitter>

            </SplitterPanel>

        </Splitter>
    </div>
</template>

