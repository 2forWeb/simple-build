<template>
    <div :class="$style.component" />
</template>

<style module>
.component {
    border: 4px solid var(--text-primary);
    border-top: 4px solid transparent;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    animation: spin 1s linear infinite;
    box-sizing: border-box;
}
</style>
