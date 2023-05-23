<template lang="pug">
section#race-section.character-sheet-section
  .item-row.my-3(@click='openNameSidebar')
    h2.fg-5 {{ character.race.name }}
  .split-line
  h2.px-5.my-3 {{ $t('character.racialPerks') }}
  plus-btn(@click='$emit("add-perk")')
  .item-row(
    v-for='(perk, i) in character.race.perks',
    @click='openPerkSidebar(i)'
  )
    h3 {{ perk.name }}
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import type { OpenSidebarFn } from '@/domain/types/components/characterSheetSidebar'
import PlusBtn from '@/components/characterSheet/PlusBtn.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  character: Character
  openSidebarFn: OpenSidebarFn
}>()
const emit = defineEmits(['add-perk'])

const openNameSidebar = () =>
  props.openSidebarFn({
    name: t('character.raceName'),
    deletable: false,
    fields: [
      {
        input: 'Text',
        value: props.character.race.name,
      },
    ],
    editCallback(fields) {
      const race = props.character.race
      race.name = fields[0].value as string
      return {
        ...props.character,
        race,
      }
    },
  })

const openPerkSidebar = (idx: number) => {
  const perk = props.character.race.perks[idx]
  props.openSidebarFn({
    name: perk.name,
    deletable: true,
    description: perk.description,
    fields: [
      {
        displayName: t('character.generic.name'),
        input: 'Text',
        value: perk.name,
      },
      {
        displayName: t('character.generic.description'),
        input: 'TextArea',
        value: perk.description,
      },
    ],
    editCallback(fields) {
      const newPerk = {
        name: fields[0].value as string,
        description: fields[1].value as string,
      }
      const race = props.character.race
      race.perks[idx] = newPerk
      return {
        ...props.character,
        race,
      }
    },
    deleteCallback() {
      const perks = props.character.race.perks
      perks.splice(idx, 1)
      const race = {
        ...props.character.race,
        perks,
      }
      return {
        ...props.character,
        race,
      }
    },
  })
}
</script>
