<template>
    <div :class="$style.component">
        <slot />
    </div>
</template>

<style module>
.component {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-20);
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
    padding-bottom: var(--space-20);
}
</style>
