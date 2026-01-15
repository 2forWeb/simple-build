<template>
    <div :class="$style.component">
        <slot />
    </div>
</template>

<style module>
.component {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
    padding-bottom: var(--space-20);
}
</style>
