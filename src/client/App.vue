<template>
    <div :class="$style.container">
        <HeaderComponent />
        <ContentComponent />
        <FooterComponent />
    </div>
</template>

<script setup lang="ts">
import HeaderComponent from '@client/components/layout/HeaderComponent.vue';
import FooterComponent from '@client/components/layout/FooterComponent.vue';
import ContentComponent from '@client/components/layout/ContentComponent.vue';
</script>

<style module>
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
</style>
