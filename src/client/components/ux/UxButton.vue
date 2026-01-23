<template>
    <button :class="['btn', type]" @click="$emit('click')" v-text="text" />
</template>

<script setup lang="ts">
defineEmits<{
    (e: 'click'): void;
}>();

const { type = 'primary', text } = defineProps<{
    type?: 'primary' | 'secondary';
    text: string;
}>();
</script>
