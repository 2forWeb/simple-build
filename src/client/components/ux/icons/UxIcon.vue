<template>
    <component :is="icons[icon]" :class="[$style.component, $style[size]]" />
</template>

<script setup lang="ts">
import { Component } from 'vue';
import CodeIcon from '@client/components/ux/icons/CodeIcon.vue';
import FormIcon from '@client/components/ux/icons/FormIcon.vue';
import SplitIcon from '@client/components/ux/icons/SpltIcon.vue';
import type { IconName, IconSize } from '@client/components/ux/icons/types';

const icons: Record<IconName, Component> = {
    code: CodeIcon,
    form: FormIcon,
    split: SplitIcon,
};

const { icon, size = 'small' } = defineProps<{
    icon: IconName;
    size?: IconSize;
}>();
</script>

<style module>
.component {
    display: inline-block;

    svg * {
        fill: var(--text-primary);
        stroke: var(--text-primary);
    }
}

.small {
    width: 24px;
    height: 24px;
}

.medium {
    width: 32px;
    height: 32px;
}
</style>
