<template>
    <div :class="$style.component">
        <ConfigTabs />

        <div :class="$style.container">
            <IconTabs />

            <div :class="$style.containerContents">
                <UxLoading v-if="getIsLoading()" />

                <div :class="{ [$style.containerInner]: true, [$style.splitView]: shouldShowForm && shouldShowRawText }">
                    <ContentForm v-if="!getIsLoading() && shouldShowForm" />

                    <RawText v-if="!getIsLoading() && shouldShowRawText" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { loadConfigFiles } from '@client/modules/config-files/load-config-files';
import { getSelectedTabIndex } from '@client/components/ux/icon-tabs/get-selected-tab-index';
import { getIsLoading } from '@client/modules/config-files/get-is-loading';
import UxLoading from '@client/components/ux/UxLoading.vue';
import ConfigTabs from '@client/components/ux/config-tabs/ConfigTabs.vue';
import IconTabs from '@client/components/ux/icon-tabs/IconTabs.vue';
import RawText from '@client/components/ux/content-raw-text/RawText.vue';
import ContentForm from '@client/components/ux/content-form/ContentForm.vue';

onMounted(async () => {
    await loadConfigFiles();
});

const shouldShowForm = computed(() => getSelectedTabIndex() === 0 || getSelectedTabIndex() === 2);
const shouldShowRawText = computed(() => getSelectedTabIndex() === 1 || getSelectedTabIndex() === 2);
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

.containerContents {
    flex-grow: 1;
}

.containerInner {
    height: 100%;
}

.splitView {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-20);
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }

    .splitView {
        grid-template-columns: 1fr;
    }
}
</style>
