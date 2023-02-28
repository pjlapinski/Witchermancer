<template lang="pug">
#main.vh-100.vw-100.bg-1
  nav-bar
  router-view
</template>

<style lang="scss">
* {
  @extend .fg-white;
}
</style>

<script setup lang="ts">
import NavBar from '@/components/common/NavBar.vue'
</script>
