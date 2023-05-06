<template lang="pug">
nav
  button#hamburger(@click='store.toggleSidebar()') &#9776;
  .flex-grow-1.d-flex.flex-center
    site-logo
</template>

<script setup lang="ts">
import SiteLogo from '@/components/common/SiteLogo.vue'
import { useGlobalStore } from '@/domain/store/global'
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()
const store = useGlobalStore()

watch(
  () => route.fullPath,
  async () => {
    store.isSidebarOpen = false
  },
)
</script>

<style scoped lang="scss">
nav {
  @extend .bg-3, .d-flex, .px-3;
  position: sticky;
  top: 0;
  height: 3rem;
}

#hamburger {
  @extend .btn-subtle;
}
</style>
