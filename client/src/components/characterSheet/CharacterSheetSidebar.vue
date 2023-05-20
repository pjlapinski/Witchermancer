<template lang="pug">
#character-sheet-sidebar(:class='{ "sidebar-hidden": !open }')
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import type { OpenedItem } from '@/domain/types/components/characterSheetSidebar'

const props = defineProps<{
  character: Character
  open: boolean
  item: OpenedItem
}>()
const emit = defineEmits(['close', 'modified'])
</script>
<style lang="scss">
#character-sheet-sidebar {
  @extend .bg-3, .vh-100, .vw-100;

  position: fixed;
  top: 0;
  left: 0;
}

.sidebar-hidden {
  translate: 100vw;
}
</style>
