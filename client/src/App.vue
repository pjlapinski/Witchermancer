<template lang="pug">
#main.vh-100.vw-100.bg-1
  nav-bar
  router-view
  side-bar
</template>

<script setup lang="ts">
import NavBar from '@/components/nav/NavBar.vue'
import SideBar from '@/components/sidebar/SideBar.vue'
</script>

<style lang="scss">
* {
  @extend .fg-white;
}

#main {
  overflow-x: hidden;
}
</style>
