<template lang="pug">
section#gear-section.character-sheet-section
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import type { OpenSidebarFn } from '@/domain/types/components/characterSheetSidebar'

const props = defineProps<{
  character: Character
  openSidebarFn: OpenSidebarFn
}>()
</script>
