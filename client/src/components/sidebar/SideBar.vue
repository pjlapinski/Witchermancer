﻿<template lang="pug">
#sidebar-screen-cover(
  @click='handleScreenCoverClick()',
  :class='{ "sidebar-hidden": !store.isSidebarOpen }'
)
aside#sidebar(:class='{ "sidebar-hidden": !store.isSidebarOpen }')
  template(v-if='state === "default"')
    #close-sidebar-btn-wrapper
      button#close-sidebar-btn(@click='store.toggleSidebar()') X
    #sidebar-items
      .sidebar-item(@click='state = "langSelect"') {{ $t('langSelect') }}
      #items-separator
      .sidebar-item(@click='handleLoginClick()') {{ $t(user.isAuthenticated ? 'logout' : 'login') }}
  template(v-else-if='state === "langSelect"')
    lang-list(@close='state = "default"')
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/domain/store/global'
import { useUserStore } from '@/domain/store/user'
import { ref } from 'vue'
import LangList from '@/components/sidebar/LangList.vue'

type SidebarState = 'default' | 'langSelect'

const store = useGlobalStore()
const user = useUserStore()

const state = ref<SidebarState>('default')

const handleScreenCoverClick = () => {
  store.toggleSidebar()
  state.value = 'default'
}
const handleLoginClick = () =>
  (window.location.pathname = user.isAuthenticated
    ? '/api/logout'
    : '/api/login')
</script>

<style lang="scss">
$transition-duration: 0.2s;
$sidebar-large-width: 200px;

#sidebar {
  @extend .bg-3;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#sidebar-items {
  @extend .d-flex, .flex-grow-1, .pb-5, .pt-3;
  flex-direction: column;

  .sidebar-small & {
    @extend .mx-3;
  }

  .sidebar-large & {
    @extend .mx-1;
  }
}

#sidebar {
  width: 100vw;
  transition: translate ease-in-out $transition-duration;

  &.sidebar-hidden {
    translate: -100vw;
    color: transparent;
    overflow: hidden;
  }
}

#close-sidebar-btn-wrapper {
  @extend .pt-3;
}

#close-sidebar-btn {
  @extend .btn-subtle, .px-3, .pt-3;
}

@media only screen and (min-width: 768px) {
  #sidebar {
    width: $sidebar-large-width;
    box-shadow: 2px 0 10px black;
    transition: translate ease-in-out $transition-duration;

    &.sidebar-hidden {
      translate: -$sidebar-large-width;
      box-shadow: none;
    }
  }

  #close-sidebar-btn-wrapper {
    display: none;
  }
}

.sidebar-item {
  @extend .p-1, .cursor-ptr, .no-select, .d-flex, .pr-5;

  justify-content: space-between;
  align-items: center;

  &:hover {
    @extend .bg-1;
  }
}

#items-separator {
  @extend .my-2;

  border-top: solid var(--color-2) 2px;
}

#sidebar-screen-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 30%;
  overflow: hidden;
  transition: opacity ease-in-out $transition-duration;

  &.sidebar-hidden {
    opacity: 0;
    display: none;
  }
}
</style>
