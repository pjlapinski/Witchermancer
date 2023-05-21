<template lang="pug">
section#magic-section.character-sheet-section
  .item-row.mt-5
    h3 {{ $t('character.vigor') }}
    h3 {{ getVigor(character) }}
  .split-line.my-3
  h2.mx-5.py-3 {{ $t('character.magic.spells') }}
  plus-btn(@click='$emit("add-spell")')
  .item-row(v-for='spell in character.spells')
    h3 {{ spell.name }}
  .split-line.my-3
  h2.mx-5.py-3 {{ $t('character.magic.hexes') }}
  plus-btn(@click='$emit("add-hex")')
  .item-row(v-for='hex in character.hexes')
    h3 {{ hex.name }}
  .split-line.my-3
  h2.mx-5.py-3 {{ $t('character.magic.rituals') }}
  plus-btn(@click='$emit("add-ritual")')
  .item-row(v-for='ritual in character.rituals')
    h3 {{ ritual.name }}
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import type { OpenSidebarFn } from '@/domain/types/components/characterSheetSidebar'
import { getVigor } from '@/domain/utility/character'
import PlusBtn from '@/components/characterSheet/PlusBtn.vue'

const props = defineProps<{
  character: Character
  openSidebarFn: OpenSidebarFn
}>()
const emit = defineEmits(['add-spell', 'add-hex', 'add-ritual'])
</script>
