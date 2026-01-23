<template>
    <div :class="$style.component">
        <UxFormRow label="Client Root Path" name="clientRoot">
            <UxInput id="clientRoot" v-model="currentObject.clientRoot" type="text" />
        </UxFormRow>

        <UxFormRow label="Asset Root Path" name="assetRoot">
            <UxInput id="assetRoot" v-model="currentObject.assetRoot" type="text" />
        </UxFormRow>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getFiles } from '@client/modules/config-files/get-files';
import { getSelectedTabIndex } from '@client/components/ux/config-tabs/get-selected-tab-index';
import UxFormRow from '@client/components/ux/form/UxFormRow.vue';
import UxInput from '@client/components/ux/form/UxInput.vue';

const currentObject = computed(() => getFiles()[getSelectedTabIndex()].configObject);
</script>

<style module>
.component {
    display: flex;
    flex-direction: column;
    gap: var(--space-20);
}
</style>
