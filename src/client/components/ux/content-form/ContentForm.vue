<template>
    <div :class="$style.component">
        <UxFormRow label="Client Root Path" name="clientRoot">
            <UxInput v-model="currentObject.clientRoot" type="text" id="clientRoot" />
        </UxFormRow>

        <UxFormRow label="Asset Root Path" name="assetRoot">
            <UxInput v-model="currentObject.assetRoot" type="text" id="assetRoot" />
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
