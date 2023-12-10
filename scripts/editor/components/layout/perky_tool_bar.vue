<script setup>
    import Button from 'primevue/button';
    import Toolbar from 'primevue/toolbar';
    import SplitButton from 'primevue/splitbutton';
    import InputText from 'primevue/inputtext';

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
</script>


<template>
    <Toolbar>
        <template #start>
            <Button icon="pi pi-plus" class="mr-2" />
            <Button icon="pi pi-print" class="mr-2" />
            <Button icon="pi pi-upload" />
        </template>

        <template #center>
            <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText placeholder="Search" />
            </span>
        </template>

        <template #end> <SplitButton label="Save" icon="pi pi-check" :model="items"></SplitButton></template>
    </Toolbar>
</template>

