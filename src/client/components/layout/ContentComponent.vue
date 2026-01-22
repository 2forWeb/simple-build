<template>
    <div :class="$style.component">
        <ConfigTabs />

        <div :class="$style.container">
            <div :class="$style.containerTabs">
                <TabSet
                    :class="$style.tabSetDirection"
                    :tabs="iconTabs"
                    direction="vertical"
                    compact
                    @tab-selected="onIconsTabSelected"
                />
            </div>

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
import TabSet from '@client/components/ux/tab/TabSet.vue';
import { configFilesState } from '@client/modules/config-files/state';
import UxLoading from '@client/components/ux/UxLoading.vue';
import UxTextArea from '@client/components/ux/form/UxTextArea.vue';
import { getSelectedTabIndex } from '@client/components/ux/config-tabs/get-selected-tab-index';
import ConfigTabs from '@client/components/ux/config-tabs/ConfigTabs.vue';
import { getIsLoading } from '@client/modules/config-files/get-is-loading';

onMounted(async () => {
    await loadConfigFiles();
});

const selectedText = computed(() =>
    configFilesState.files.length ? configFilesState.files[getSelectedTabIndex()].fileContents : ''
);

const iconTabs = [{ icon: 'form' as const }, { icon: 'code' as const }, { icon: 'split' as const }];
const onIconsTabSelected = (index: number) => {
    console.log('Icon tab selected:', index);
};
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

    .tabSetDirection {
        flex-direction: row !important;
    }
}

.containerTabs {
    display: flex;
    flex-direction: column;
    gap: var(--space-20);
}

.containerContents {
    flex-grow: 1;
}
</style>
