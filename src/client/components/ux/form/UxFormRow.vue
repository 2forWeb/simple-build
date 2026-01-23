<template>
    <div :class="$style.component">
        <label :class="$style.label" :for="name" v-text="label" />

        <slot />
    </div>
</template>

<script setup lang="ts">
const { label, name } = defineProps<{
    label: string;
    name: string;
}>();
</script>

<style module>
.component {
    display: flex;
    flex-direction: row;
    gap: var(--space-20);
    align-items: center;
}

.label {
    flex-basis: 50%;
    color: var(--text-primary);
}
</style>
