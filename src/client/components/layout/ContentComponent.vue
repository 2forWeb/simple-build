<template>
    <div :class="$style.component">
        <ConfigTabs />

        <div :class="$style.container">
            <IconTabs />

            <div :class="$style.containerContents">
                <UxTextArea v-if="!getIsLoading()" v-model="selectedText" />

                <UxLoading v-else />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { loadConfigFiles } from '@client/modules/config-files/load-config-files';
import UxLoading from '@client/components/ux/UxLoading.vue';
import UxTextArea from '@client/components/ux/form/UxTextArea.vue';
import { getSelectedTabIndex } from '@client/components/ux/config-tabs/get-selected-tab-index';
import ConfigTabs from '@client/components/ux/config-tabs/ConfigTabs.vue';
import { getIsLoading } from '@client/modules/config-files/get-is-loading';
import { getFiles } from '@client/modules/config-files/get-files';
import IconTabs from '@client/components/ux/icon-tabs/IconTabs.vue';

onMounted(async () => {
    await loadConfigFiles();
});

const selectedText = computed(() => {
    const files = getFiles();

    return files.length ? files[getSelectedTabIndex()].fileContents : '';
});
</script>

<style module>
.component {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: var(--space-20) var(--space-40);
    overflow: auto;
}

.container {
    padding: var(--space-20) var(--space-20) 0;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    gap: var(--space-20);
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }
}

.containerContents {
    flex-grow: 1;
}
</style>
