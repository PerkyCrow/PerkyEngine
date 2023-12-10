<script setup>
    import Splitter from 'primevue/splitter';
    import SplitterPanel from 'primevue/splitterpanel';
    import PerkyToolbar from './perky_toolbar.vue';
    import PerkyLeftbar from './perky_leftbar.vue';
    import PerkyRightbar from './perky_rightbar.vue';
    import PerkyMainview from './perky_mainview.vue';
</script>


<template>
    <div class="editor">
        <Splitter layout="vertical" style="height: 100vh" :gutterSize="0">

            <SplitterPanel style="flex-basis: calc(3.25em + 0px); overflow: visible; background-color: #3c3c3c;">
                <PerkyToolbar></PerkyToolbar>
            </SplitterPanel>

            <SplitterPanel style="flex-basis: calc(100vh - 3.25em);">

                <Splitter :gutterSize="6">
                    <SplitterPanel :minSize="10" :size="20" style="background-color: #252526;">
                        <PerkyLeftbar></PerkyLeftbar>
                    </SplitterPanel>

                    <SplitterPanel :minSize="40" :size="60" style="background-color: #1e1e1e;">
                        <PerkyMainview></PerkyMainview>
                    </SplitterPanel>

                    <SplitterPanel :minSize="10" :size="20" style="background-color: #252526;">
                        <PerkyRightbar></PerkyRightbar>
                    </SplitterPanel>
                </Splitter>

            </SplitterPanel>

        </Splitter>
    </div>
</template>

