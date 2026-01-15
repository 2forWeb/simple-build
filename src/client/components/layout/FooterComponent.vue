<template>
    <footer :class="$style.component">
        <p>Built with ❤️ by <a href="https://2forweb.com" :class="$style.anchor" target="_blank">2forweb</a></p>

        <p>Simple-Client version <span :class="$style.version" v-text="version" /></p>
    </footer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getVersion } from '@client/api/get-version';

const version = ref('');

onMounted(async () => {
    const versionResponse = await getVersion();

    if (versionResponse.success && versionResponse.data !== null) {
        version.value = versionResponse.data.version;
    } else {
        version.value = 'unknown';
    }
});
</script>

<style module>
.component {
    background-color: var(--surface);
    padding: var(--space-20) var(--space-40);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.anchor {
    color: var(--color-2forweb);
    text-decoration: none;
}

.version {
    font-weight: bold;
    color: var(--accent-primary);
}
</style>
