<template lang="pug">
section#race-section.character-sheet-section
  .item-row.my-3(@click='')
    h3.fg-5 {{ character.race.name }}
  .split-line
  h2.px-5.my-3 {{ $t('character.racialPerks') }}
  .plus-btn.mb-3(@click='$emit("add-perk")') +
  .item-row(v-for='perk in character.race.perks', @click='')
    h3 {{ perk.name }}
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import type { OpenSidebarFn } from '@/domain/types/components/characterSheetSidebar'

const props = defineProps<{
  character: Character
  openSidebarFn: OpenSidebarFn
}>()
const emit = defineEmits(['add-perk'])
</script>
