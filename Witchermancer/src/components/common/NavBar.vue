<template lang="pug">
nav
  site-logo#home-btn
</template>

<script setup lang="ts">
import SiteLogo from '@/components/common/SiteLogo.vue'
</script>

<style scoped lang="scss">
nav {
  @extend .bg-3, .p-3, .d-flex;
  position: sticky;
  top: 0;
}

#home-btn {
  @extend .flex-grow-1;
}
</style>
