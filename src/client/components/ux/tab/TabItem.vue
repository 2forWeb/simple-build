<template>
    <a href="#" @click.prevent="() => {}" v-text="tab.label" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { TabItemProps } from './types';

const { tab } = defineProps<{ tab: TabItemProps }>();
</script>
