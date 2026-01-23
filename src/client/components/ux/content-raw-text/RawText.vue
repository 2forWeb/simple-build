<template>
    <UxTextArea v-model="selectedText" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getFiles } from '@client/modules/config-files/get-files';
import { getSelectedTabIndex } from '@client/components/ux/config-tabs/get-selected-tab-index';
import UxTextArea from '@client/components/ux/form/UxTextArea.vue';

const selectedText = computed(() => {
    const files = getFiles();

    return files.length ? files[getSelectedTabIndex()].fileContents : '';
});
</script>
