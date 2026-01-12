<template>
  <div>
    <a href="#" @click.prevent="switchTheme" v-text="themeText"></a>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const themeText = ref('☀️');

const switchTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  themeText.value = newTheme === 'dark' ? '🌙' : '☀️';
};
</script>
