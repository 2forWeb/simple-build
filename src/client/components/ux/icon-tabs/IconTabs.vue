<template>
    <div :class="$style.component">
        <TabSet
            :class="$style.tabSetDirection"
            :tabs="iconTabs"
            direction="vertical"
            compact
            @tab-selected="setSelectedTabIndex"
        />
    </div>
</template>

<script setup lang="ts">
import TabSet from '@client/components/ux/tab/TabSet.vue';
import { setSelectedTabIndex } from '@client/components/ux/icon-tabs/set-selected-tab-index';

const iconTabs = [{ icon: 'form' as const }, { icon: 'code' as const }, { icon: 'split' as const }];
</script>

<style module>
.component {
    display: flex;
    flex-direction: column;
    gap: var(--space-20);
}

@media (max-width: 768px) {
    .tabSetDirection {
        flex-direction: row !important;
    }
}
</style>
