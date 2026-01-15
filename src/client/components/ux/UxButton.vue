<template>
    <button :class="['btn', type]" @click="$emit('click')" v-text="text" />
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

defineEmits<{
    (e: 'click'): void;
}>();

const { type = 'primary', text } = defineProps<{
    type?: 'primary' | 'secondary';
    text: string;
}>();
</script>
