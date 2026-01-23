<template>
    <input :id="id" :type="type" :value="modelValue" :class="['input', $style.component]" @input="onInput" />
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const { type = 'text', id = undefined } = defineProps<{
    modelValue: string | undefined;
    type?: string;
    id?: string;
}>();

const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

function onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    emits('update:modelValue', target.value);
}
</script>

<style module>
.component {
    padding: var(--space-10) var(--space-20) !important;
    font-size: 1rem !important;
    color: var(--text-secondary);

    &:focus {
        color: var(--text-primary);
    }
}
</style>
