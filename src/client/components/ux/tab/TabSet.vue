<template>
    <div :class="$style.component">
        <TabItem v-for="(tab, index) in tabs" :key="index" :tab="tab" :selected="selectedTabIndex === index" />
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { TabItemProps } from './types.ts';
import TabItem from '@client/components/ux/tab/TabItem.vue';

const { tabs, selectedTabIndex = 0 } = defineProps<{
    tabs: TabItemProps[];
    selectedTabIndex?: number;
}>();
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
