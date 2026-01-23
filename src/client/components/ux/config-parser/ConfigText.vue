<template>
    <textarea v-model="innerText"></textarea>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { text } = defineProps<{
    text: string;
}>();

const innerText = computed(() => text);
</script>
