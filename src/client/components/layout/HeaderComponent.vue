<template>
    <header :class="$style.component">
        <h1>Simple-Build Dashboard</h1>

        <ThemeIcon />
    </header>
</template>

<script setup lang="ts">
import ThemeIcon from '../ux/theme/ThemeIcon.vue';
</script>

<style module>
.component {
    background-color: var(--surface);
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
