<template>
    <div>
        <a href="#" @click.prevent="switchTheme" v-text="themeText"></a>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { themeState } from './state';
import { loadPreferredTheme } from './load-preferred-theme';
import { updateThemeClass } from './update-theme-class';
import { setCookie } from '@client/utils/cookie';

const themeText = computed(() => (themeState.darkMode ? '🌙' : '☀️'));

loadPreferredTheme();
updateThemeClass();

const switchTheme = () => {
    themeState.darkMode = !themeState.darkMode;
    setCookie('theme', themeState.darkMode ? 'dark' : 'light');
    updateThemeClass();
};
</script>
