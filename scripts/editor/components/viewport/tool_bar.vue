<script setup>

    import {ref} from 'vue'
    import Button from 'primevue/button'
    import Toolbar from 'primevue/toolbar'
    import SplitButton from 'primevue/splitbutton'
    import InputText from 'primevue/inputtext'
    import InputGroup from 'primevue/inputgroup'
    import InputGroupAddon from 'primevue/inputgroupaddon'
    import RadioButton from 'primevue/radiobutton'
    import Checkbox from 'primevue/checkbox'
    import OverlayPanel from 'primevue/overlaypanel'

    const items = [{
        label: 'Option 1',
        icon: 'pi pi-refresh',
        command: () => {
            // action for Option 1
        }
    }, {
        label: 'Option 2',
        icon: 'pi pi-times',
        command: () => {
            // action for Option 2
        }
    }, {
        label: 'Option 3',
        icon: 'pi pi-external-link',
        command: () => {
            // action for Option 3
        }
    }]

    const checked = ref(false);

    const op = ref();

const toggle = (event) => {
    op.value.toggle(event);
}
</script>


<template>
    <Toolbar>
        <template #start>

        </template>

        <template #center>

        </template>

        <template #end>
            <InputGroup>
                <InputGroupAddon>
                    <Checkbox v-model="checked" :binary="true" />
                </InputGroupAddon>
                <InputGroupAddon>
                    <i class="pi pi-star-fill"></i>
                </InputGroupAddon>
                <Button type="button" icon="pi pi-angle-down" @click="toggle" />
            </InputGroup>
            <OverlayPanel ref="op">
                <img src="https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg" alt="Bamboo Watch" width="600" />
            </OverlayPanel>
        </template>
    </Toolbar>
</template>

