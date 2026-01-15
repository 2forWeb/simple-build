<template>
    <div :class="$style.container">
        <HeaderComponent />

        <div :class="$style.content">
            <h1>Content Here!</h1>
        </div>

        <FooterComponent />
    </div>
</template>

<script setup lang="ts">
import HeaderComponent from './components/layout/HeaderComponent.vue';
import FooterComponent from './components/layout/FooterComponent.vue';
</script>

<style module>
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.content {
    flex-grow: 1;
    padding: var(--space-40);
    overflow: auto;
}
</style>
