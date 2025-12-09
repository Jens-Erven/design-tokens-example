<script setup>
const handleClick = () => {
  console.log("Button clicked");
};
</script>

<template>
  <button @click="handleClick" class="button">
    <slot />
  </button>
</template>

<style scoped>
.button {
  background-color: var(--button-background);
  color: var(--button-foreground);
  padding: var(--button-padding-vertical) var(--button-padding-horizontal);
  border: none;
}
</style>
