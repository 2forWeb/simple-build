<template>
    <div :class="$style.component">
        <TabItem
            v-for="(tab, index) in tabs"
            :key="index"
            :tab="tab"
            :selected="selectedTabIndex === index"
            @click="selectTab(index)"
        />
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import type { TabItemProps } from './types.ts';
import TabItem from '@client/components/ux/tab/TabItem.vue';

const selectedTabIndex = ref(0);
const { tabs } = defineProps<{
    tabs: TabItemProps[];
}>();

const emit = defineEmits<{
    (e: 'tabSelected', index: number): void;
}>();

const selectTab = (index: number) => {
    selectedTabIndex.value = index;
    emit('tabSelected', index);
};
</script>

<style module>
.component {
    padding: 0 var(--space-20);
    display: flex;
    gap: var(--space-20);
    flex-direction: row;
    align-items: center;
    justify-content: start;
}
</style>
