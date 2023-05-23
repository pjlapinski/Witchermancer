<template lang="pug">
section#magic-section.character-sheet-section
  h2.section-title {{ $t('characterSheet.section.magic') }}
  .item-row.mt-5(@click='openVigorSidebar')
    h3 {{ $t('character.vigor') }}
    h3 {{ getVigor(character) }}
  .split-line.my-3
  h2.mx-5.py-3 {{ $t('character.magic.spells') }}
  plus-btn(@click='$emit("add-spell")')
  .item-row(
    v-for='(spell, i) in character.spells',
    @click='openSpellSidebar(i)'
  )
    h3 {{ spell.name }}
  .split-line.my-3
  h2.mx-5.py-3 {{ $t('character.magic.hexes') }}
  plus-btn(@click='$emit("add-hex")')
  .item-row(v-for='(hex, i) in character.hexes', @click='openHexSidebar(i)')
    h3 {{ hex.name }}
  .split-line.my-3
  h2.mx-5.py-3 {{ $t('character.magic.rituals') }}
  plus-btn(@click='$emit("add-ritual")')
  .item-row(
    v-for='(ritual, i) in character.rituals',
    @click='openRitualSidebar(i)'
  )
    h3 {{ ritual.name }}
</template>

<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import type { OpenSidebarFn } from '@/domain/types/components/characterSheetSidebar'
import { getVigor, vigorMod, getModifier } from '@/domain/utility/character'
import PlusBtn from '@/components/characterSheet/PlusBtn.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  character: Character
  openSidebarFn: OpenSidebarFn
}>()
const emit = defineEmits(['add-spell', 'add-hex', 'add-ritual'])

const openVigorSidebar = () =>
  props.openSidebarFn({
    name: t('character.vigor'),
    deletable: false,
    fields: [
      {
        displayName: t('character.bonusVigor'),
        input: 'Number',
        value: getModifier(props.character, vigorMod),
      },
    ],
    editCallback(fields) {
      const mods = { ...props.character.modifiers }
      mods[vigorMod] = fields[0].value as number
      return {
        ...props.character,
        modifiers: mods,
      }
    },
  })

const openSpellSidebar = (idx: number) => {
  const spell = props.character.spells[idx]
  props.openSidebarFn({
    name: spell.name,
    deletable: true,
    description: `${t('character.magic.cost')}: ${spell.cost}\n\n${t(
      'character.magic.range',
    )}: ${spell.range}\n\n${t('character.magic.effect')}: ${spell.effect}`,
    fields: [
      {
        displayName: t('character.generic.name'),
        input: 'Text',
        value: spell.name,
      },
      {
        displayName: t('character.magic.cost'),
        input: 'Text',
        value: spell.cost,
      },
      {
        displayName: t('character.magic.range'),
        input: 'Text',
        value: spell.range,
      },
      {
        displayName: t('character.magic.effect'),
        input: 'TextArea',
        value: spell.effect,
      },
    ],
    editCallback(fields) {
      const newSpell = {
        name: fields[0].value as string,
        cost: fields[1].value as string,
        range: fields[2].value as string,
        effect: fields[3].value as string,
      }
      const spells = [...props.character.spells]
      spells[idx] = newSpell
      return {
        ...props.character,
        spells,
      }
    },
    deleteCallback() {
      const spells = props.character.spells
      spells.splice(idx, 1)
      return {
        ...props.character,
        spells,
      }
    },
  })
}

const openHexSidebar = (idx: number) => {
  const hex = props.character.hexes[idx]
  props.openSidebarFn({
    name: hex.name,
    deletable: true,
    description: `${t('character.magic.cost')}: ${hex.cost}\n\n${t(
      'character.magic.effect',
    )}: ${hex.effect}`,
    fields: [
      {
        displayName: t('character.generic.name'),
        input: 'Text',
        value: hex.name,
      },
      {
        displayName: t('character.magic.cost'),
        input: 'Text',
        value: hex.cost,
      },
      {
        displayName: t('character.magic.effect'),
        input: 'TextArea',
        value: hex.effect,
      },
    ],
    editCallback(fields) {
      const newHex = {
        name: fields[0].value as string,
        cost: fields[1].value as string,
        effect: fields[2].value as string,
      }
      const hexes = [...props.character.hexes]
      hexes[idx] = newHex
      return {
        ...props.character,
        hexes,
      }
    },
    deleteCallback() {
      const hexes = props.character.hexes
      hexes.splice(idx, 1)
      return {
        ...props.character,
        hexes,
      }
    },
  })
}

const openRitualSidebar = (idx: number) => {
  const ritual = props.character.rituals[idx]
  props.openSidebarFn({
    name: ritual.name,
    deletable: true,
    description: `${t('character.magic.cost')}: ${ritual.cost}\n\n${t(
      'character.magic.time',
    )}: ${ritual.time}\n\n${t('character.difficultyClass.short')}: ${
      ritual.difficultyClass
    }\n\n${t('character.magic.components')}: ${ritual.components}\n\n${t(
      'character.magic.effect',
    )}: ${ritual.effect}`,
    fields: [
      {
        displayName: t('character.generic.name'),
        input: 'Text',
        value: ritual.name,
      },
      {
        displayName: t('character.magic.cost'),
        input: 'Text',
        value: ritual.cost,
      },
      {
        displayName: t('character.magic.time'),
        input: 'Text',
        value: ritual.time,
      },
      {
        displayName: t('character.difficultyClass.full'),
        input: 'Text',
        value: ritual.difficultyClass,
      },
      {
        displayName: t('character.magic.components'),
        input: 'TextArea',
        value: ritual.components,
      },
      {
        displayName: t('character.magic.effect'),
        input: 'TextArea',
        value: ritual.effect,
      },
    ],
    editCallback(fields) {
      const newRitual = {
        name: fields[0].value as string,
        cost: fields[1].value as string,
        time: fields[2].value as string,
        difficultyClass: fields[3].value as string,
        components: fields[4].value as string,
        effect: fields[5].value as string,
      }
      const rituals = [...props.character.rituals]
      rituals[idx] = newRitual
      return {
        ...props.character,
        rituals,
      }
    },
    deleteCallback() {
      const rituals = props.character.rituals
      rituals.splice(idx, 1)
      return {
        ...props.character,
        rituals,
      }
    },
  })
}
</script>
