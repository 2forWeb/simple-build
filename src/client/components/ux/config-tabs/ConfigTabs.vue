<template>
    <TabContainer>
        <UxLoading v-if="isLoading" />

        <template v-else>
            <TabSet v-if="tabs.length" :tabs="tabs" @tab-selected="setSelectedTabIndex" />
            <div v-if="!tabs.length">No config files found!</div>

            <UxButton :class="$style.addBtn" text="Add another Config File!" />
        </template>
    </TabContainer>
</template>

<script setup lang="ts">
import UxButton from '@client/components/ux/UxButton.vue';
import UxLoading from '@client/components/ux/UxLoading.vue';
import TabSet from '@client/components/ux/tab/TabSet.vue';
import TabContainer from '@client/components/ux/tab/TabContainer.vue';
import { getIsLoading } from '@client/modules/config-files/get-is-loading';
import { computed } from 'vue';
import { getFiles } from '@client/modules/config-files/get-files';
import { setSelectedTabIndex } from '@client/components/ux/config-tabs/set-selected-tab-index';

const isLoading = computed(() => getIsLoading());
const tabs = computed(() => getFiles().map((item) => ({ label: item.filePath })));
</script>

<style module>
.addBtn {
    margin: 0 var(--space-20);
}
</style>
