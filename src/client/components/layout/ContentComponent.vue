<template>
    <div :class="$style.component">
        <TabContainer>
            <UxLoading v-if="isLoading" />

            <template v-else>
                <TabSet v-if="tabs.length" :tabs="tabs" />
                <div v-if="!tabs.length">No config files found!</div>

                <UxButton text="Add another Config File!" />
            </template>
        </TabContainer>
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
    padding: var(--space-20) var(--space-40);
    overflow: auto;
}
</style>
