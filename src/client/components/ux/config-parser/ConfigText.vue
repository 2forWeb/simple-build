<template>
    <textarea v-model="innerText" :class="$style.component"></textarea>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

const { text } = defineProps<{
    text: string;
}>();

const innerText = ref(text);
</script>

<style module>
.component {
    width: 100%;
    height: 100%;
    border: 1px solid var(--border);
    border-radius: 5px;
    background: var(--surface);
    color: var(--text-primary);
    font-size: 1.2rem;
    padding: var(--space-20);
    resize: none;
}
</style>
