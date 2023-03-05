<template lang="pug">
nav
  .flex-grow-1.d-flex.flex-center
    site-logo
</template>

<script setup lang="ts">
import SiteLogo from '@/components/common/SiteLogo.vue'
</script>

<style scoped lang="scss">
nav {
  @extend .bg-3, .d-flex;
  position: sticky;
  top: 0;
  height: 3rem;
}
</style>
