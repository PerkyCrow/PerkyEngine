<script setup>
    import Tree from 'primevue/tree';

    const nodes = [{
        key: '0',
        label: 'Documents',
        icon: 'pi pi-fw pi-folder',
        children: [{
            key: '0-0',
            label: 'Work',
            icon: 'pi pi-fw pi-briefcase',
            children: [
                {label: 'Expenses.doc', icon: 'pi pi-fw pi-file'},
                {label: 'Resume.doc', icon: 'pi pi-fw pi-file'}
            ]
        }, {
            key: '0-1',
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            children: [
                {label: 'Invoices.txt', icon: 'pi pi-fw pi-file'}
            ]
        }]
    }, {
        key: '1',
        label: 'Pictures',
        icon: 'pi pi-fw pi-image',
        children: [
            {key: '1-0', label: 'barcelona.jpg', icon: 'pi pi-fw pi-image'},
            {key: '1-1', label: 'logo.jpg', icon: 'pi pi-fw pi-image'},
            {key: '1-2', label: 'madrid.jpg', icon: 'pi pi-fw pi-image'}
        ]
    }, {
        key: '2',
        label: 'Movies',
        icon: 'pi pi-fw pi-video',
        children: [
            {key: '2-0', label: 'parasite.mkv', icon: 'pi pi-fw pi-file-video'},
            {key: '2-1', label: 'joker.avi', icon: 'pi pi-fw pi-file-video'}
        ]
    }]
</script>


<template>
    <Tree :value="nodes"></Tree>
</template>

