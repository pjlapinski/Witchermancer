<template lang="pug">
#sidebar-screen-cover(
  @click='store.toggleSidebar()',
  :class='{ "sidebar-hidden": !store.isSidebarOpen }',
  v-if='!useMobile'
)
#sidebar(
  :class='[useMobile ? "sidebar-mobile" : "sidebar-large", { "sidebar-hidden": !store.isSidebarOpen }]'
)
  .pt-3(v-if='useMobile')
    button#close-sidebar-btn(@click='store.toggleSidebar()') X
  #sidebar-items
    .sidebar-item
      span item 1
      span icon1
    .sidebar-item
      span item 2
      span icon2
    .flex-grow-1
    .sidebar-item
      span logout
      span icon3
</template>

<script setup lang="ts">
import { smallScreen } from '@/domain/utility/layout'
import { useGlobalStore } from '@/domain/store/global'
import { onMounted, onUnmounted, ref } from 'vue'

const store = useGlobalStore()

const useMobile = ref(smallScreen())

const updateUseMobile = () => {
  useMobile.value = smallScreen()
}
onMounted(() => addEventListener('resize', updateUseMobile))
onUnmounted(() => removeEventListener('resize', updateUseMobile))
</script>

<style scoped lang="scss">
$transition-duration: 0.2s;
$sidebar-large-width: 200px;

#sidebar {
  @extend .bg-3;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

#sidebar-items {
  @extend .d-flex, .flex-grow-1, .pb-5, .pt-3;
  flex-direction: column;

  .sidebar-mobile & {
    @extend .mx-3;
  }

  .sidebar-large & {
    @extend .mx-1;
  }
}

.sidebar-mobile {
  width: 100vw;
  transition: translate ease-in-out $transition-duration;

  &.sidebar-hidden {
    translate: -100vw;
    color: transparent;
    overflow: hidden;
  }
}

.sidebar-large {
  width: $sidebar-large-width;
  box-shadow: 2px 0 10px black;
  transition: translate ease-in-out $transition-duration;

  &.sidebar-hidden {
    translate: -$sidebar-large-width;
    box-shadow: none;
  }
}

#close-sidebar-btn {
  @extend .btn-subtle, .px-3;
}

.sidebar-item {
  @extend .p-1, .cursor-ptr, .no-select, .d-flex, .pr-5;

  border-radius: 8px;
  justify-content: space-between;

  &:hover {
    @extend .bg-1;
  }
}

#sidebar-screen-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 30%;
  transition: opacity ease-in-out $transition-duration;

  &.sidebar-hidden {
    opacity: 0;
    display: none;
  }
}
</style>
