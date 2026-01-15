<template>
    <div :class="$style.component">
        <TabSet v-if="!isLoading && tabs.length" :tabs="tabs" />
        <div v-if="!isLoading && !tabs.length">No config files found!</div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { loadConfigFiles } from '@client/modules/config-files/load-config-files';
import TabSet from '@client/components/ux/tab/TabSet.vue';
import { configFilesState } from '@client/modules/config-files/state';

const isLoading = ref(true);
onMounted(async () => {
    await loadConfigFiles();
    isLoading.value = false;
});

const tabs = computed(() => Object.keys(configFilesState.files).map((key) => ({ label: key })));
</script>

<style module>
.component {
    flex-grow: 1;
    padding: var(--space-40);
    overflow: auto;
}
</style>
