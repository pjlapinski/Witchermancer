<template lang="pug">
section#profession-section.character-sheet-section
  .item-row.my-3(@click='')
    h2.fg-5 {{ character.profession.name }}
  .split-line
  h2.px-5.my-3 {{ $t('character.definingSkill') }}
  .item-row(@click='')
    h3 {{ character.profession.definingSkill.name }}
  h2.px-5.my-3 {{ $t('character.professionAbilities') }}
  plus-btn(@click='$emit("add-ability")')
  .item-row(v-for='ability in character.profession.abilities', @click='')
    h3 {{ ability.name }}
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import type { OpenSidebarFn } from '@/domain/types/components/characterSheetSidebar'
import PlusBtn from '@/components/characterSheet/PlusBtn.vue'

const props = defineProps<{
  character: Character
  openSidebarFn: OpenSidebarFn
}>()
const emit = defineEmits(['add-ability'])
</script>
