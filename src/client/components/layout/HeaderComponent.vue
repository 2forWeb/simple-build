<template>
    <header :class="$style.component">
        <h1>Simple-Build Dashboard</h1>

        <ThemeIcon />
    </header>
</template>

<script setup lang="ts">
import ThemeIcon from '@client/components/ux/theme/ThemeIcon.vue';
</script>

<style module>
.component {
    background-color: var(--surface);
    padding: var(--space-20) var(--space-40);
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
