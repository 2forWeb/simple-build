<template>
    <textarea :value="modelValue" :class="['input', $style.component]" @input="onInput"></textarea>
</template>

<script setup lang="ts">
defineProps<{
    modelValue: string;
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
    height: 100%;
    padding: var(--space-20) !important;
    resize: none;
}
</style>
