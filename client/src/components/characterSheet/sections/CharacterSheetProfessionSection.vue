<template lang="pug">
section#profession-section.character-sheet-section
  .item-row.my-3(@click='openNameSidebar')
    h2.fg-5 {{ character.profession.name }}
  .split-line
  h2.px-5.my-3 {{ $t('character.definingSkill') }}
  .item-row(@click='openDefiningSkillSidebar(props, t)')
    h3 {{ character.profession.definingSkill.name }}
  h2.px-5.my-3 {{ $t('character.professionAbilities') }}
  plus-btn(@click='$emit("add-ability")')
  .item-row(
    v-for='(ability, i) in character.profession.abilities',
    @click='openAbilitySidebar(i, props, t)'
  )
    h3 {{ ability.name }}
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import type { OpenSidebarFn } from '@/domain/types/components/characterSheetSidebar'
import PlusBtn from '@/components/characterSheet/PlusBtn.vue'
import { useI18n } from 'vue-i18n'
import { openDefiningSkillSidebar, openAbilitySidebar } from '@/domain/utility/components/characterSheetSidebar'

const { t } = useI18n()

const props = defineProps<{
  character: Character
  openSidebarFn: OpenSidebarFn
}>()
const emit = defineEmits(['add-ability'])

const openNameSidebar = () =>
  props.openSidebarFn({
    name: t('character.professionName'),
    deletable: false,
    fields: [
      {
        input: 'Text',
        value: props.character.profession.name,
      },
    ],
    editCallback(fields) {
      const profession = props.character.profession
      profession.name = fields[0].value as string
      return {
        ...props.character,
        profession,
      }
    },
  })
</script>
