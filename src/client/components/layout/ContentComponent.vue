<template>
    <div :class="$style.component">
        <TabContainer>
            <UxLoading v-if="isLoading" />

            <template v-else>
                <TabSet v-if="tabs.length" :tabs="tabs" @tab-selected="onTabSelected" />
                <div v-if="!tabs.length">No config files found!</div>

                <UxButton :class="$style.addBtn" text="Add another Config File!" />
            </template>
        </TabContainer>

        <div :class="$style.container">
            <ConfigText v-if="!isLoading" :text="selectedText" />

            <UxLoading v-else />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { loadConfigFiles } from '@client/modules/config-files/load-config-files';
import TabSet from '@client/components/ux/tab/TabSet.vue';
import { configFilesState } from '@client/modules/config-files/state';
import TabContainer from '@client/components/ux/tab/TabContainer.vue';
import UxButton from '@client/components/ux/UxButton.vue';
import UxLoading from '@client/components/ux/UxLoading.vue';
import ConfigText from '@client/components/ux/config-parser/ConfigText.vue';

const isLoading = ref(true);
onMounted(async () => {
    await loadConfigFiles();
    isLoading.value = false;
});

const tabs = computed(() => configFilesState.files.map((item) => ({ label: item.filePath })));
const selectedTabIndex = ref(0);

const selectedText = computed(() =>
    configFilesState.files.length ? configFilesState.files[selectedTabIndex.value].fileContents : ''
);

const onTabSelected = (index: number) => {
    selectedTabIndex.value = index;
    console.log(configFilesState.files[index]);
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
}

.addBtn {
    margin: 0 var(--space-20);
}
</style>
