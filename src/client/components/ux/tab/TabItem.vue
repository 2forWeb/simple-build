<template>
    <a href="#" :class="{ [$style.component]: true, [$style.selected]: selected }" @click.prevent="onClick" v-text="tab.label" />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { TabItemProps } from './types';

const { tab, selected } = defineProps<{
    tab: TabItemProps;
    selected: boolean;
}>();

const emit = defineEmits<{
    (e: 'click'): void;
}>();

const onClick = () => {
    emit('click');
};
</script>

<style module>
.component {
    display: block;
    padding: var(--space-10) var(--space-20);
    color: var(--text-secondary);
    white-space: nowrap;
}

.selected {
    border-radius: 5px;
    background: var(--surface-alt);
    color: var(--accent-primary);
}
</style>
