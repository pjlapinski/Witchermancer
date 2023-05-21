<template lang="pug">
section#gear-section.character-sheet-section
  .item-row.mt-5.pb-3(@click='')
    h3 {{ $t('character.encumbrance') }}
    h3 {{ getCarriedWeight(character) }} / {{ getEncumbranceScore(character) }}
  h2.mx-5.py-3 {{ $t('character.weapons') }}
  plus-btn(@click='$emit("add-weapon")')
  .item-row(v-for='weapon in character.weapons')
    h3 {{ weapon.name }}
  h2.mx-5.py-3 {{ $t('character.armor') }}
  .item-row(@click='', v-for='section in AllArmorSections')
    h3 {{ $t(`character.armorSection.${section}`) }}
    h3(v-if='character.armor[section] === null') {{ getStoppingPower(character, section) }} {{ $t('character.stoppingPower.abbr') }}
    h3(v-else) {{ character.armor[section]?.name ?? '' }} ({{ getStoppingPower(character, section) }} {{ $t('character.stoppingPower.abbr') }})
  h2.mx-5.py-3 {{ $t('character.gear') }}
  plus-btn(@click='$emit("add-gear")')
  .item-row(v-for='gear in character.gear')
    h3 {{ gear.name }}
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import type { OpenSidebarFn } from '@/domain/types/components/characterSheetSidebar'
import {
  getCarriedWeight,
  getEncumbranceScore,
  getStoppingPower,
} from '@/domain/utility/character'
import { AllArmorSections } from '@/domain/types/armor'
import PlusBtn from '@/components/characterSheet/PlusBtn.vue'

const props = defineProps<{
  character: Character
  openSidebarFn: OpenSidebarFn
}>()
const emit = defineEmits(['add-gear', 'add-weapon'])
</script>
