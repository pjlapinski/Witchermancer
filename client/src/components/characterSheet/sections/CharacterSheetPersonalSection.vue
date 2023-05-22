<template lang="pug">
section#life-section.character-sheet-section
  .item-row.my-3(@click='openNameSidebar')
    h2.fg-5 {{ character.name }}
  .split-line.mb-3
  .item-row(@click='openAgeSidebar')
    h3 {{ $t('character.age') }}
    h3 {{ character.age }}
  .item-row(@click='openGenderSidebar')
    h3 {{ $t('character.gender') }}
    h3 {{ character.gender }}
  .item-row(@click='openReputationSidebar')
    h3 {{ $t('character.reputation') }}
    h3 {{ character.reputation }}
  .item-row(@click='openSocialStandingSidebar')
    h3 {{ $t('character.socialStanding.name') }}
    h3 {{ $t(`character.socialStanding.${character.socialStanding.toLowerCase()}`) }}
  .item-row(@click='openImprovementPointsSidebar')
    h3 {{ $t('character.improvementPoints') }}
    h3 {{ character.improvementPoints }}
  h2.px-5.my-3 {{ $t('character.lifePath') }}
  .px-5.d-flex.flex-col
    resize-textarea.textarea-h3(
      v-model='character.lifePath',
      @blur.native='$emit("save")',
      :placeholder='$t("character.lifePath")'
    )
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import type { OpenSidebarFn } from '@/domain/types/components/characterSheetSidebar'
import { AllSocialStandings, type SocialStanding } from '@/domain/types/social'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  character: Character
  openSidebarFn: OpenSidebarFn
}>()
const emit = defineEmits(['save'])

const openNameSidebar = () =>
  props.openSidebarFn({
    name: t('character.name'),
    deletable: false,
    fields: [
      {
        value: props.character.name,
        input: 'Text',
      },
    ],
    editCallback(fields) {
      return { ...props.character, name: fields[0].value as string }
    },
  })

const openAgeSidebar = () =>
  props.openSidebarFn({
    name: t('character.age'),
    deletable: false,
    fields: [
      {
        value: props.character.age,
        input: 'PositiveNumber',
      },
    ],
    editCallback(fields) {
      return { ...props.character, age: fields[0].value as number }
    },
  })

const openGenderSidebar = () =>
  props.openSidebarFn({
    name: t('character.gender'),
    deletable: false,
    fields: [
      {
        value: props.character.gender,
        input: 'Text',
      },
    ],
    editCallback(fields) {
      return { ...props.character, gender: fields[0].value as string }
    },
  })

const openReputationSidebar = () =>
  props.openSidebarFn({
    name: t('character.reputation'),
    deletable: false,
    fields: [
      {
        value: props.character.reputation,
        input: 'Text',
      },
    ],
    editCallback(fields) {
      return { ...props.character, reputation: fields[0].value as string }
    },
  })

const openSocialStandingSidebar = () =>
  props.openSidebarFn({
    name: t('character.socialStanding.name'),
    deletable: false,
    fields: [
      {
        value: props.character.socialStanding,
        input: 'Select',
        selectOptions: AllSocialStandings.map(ss => ({
          text: t(`character.socialStanding.${ss.toLowerCase()}`),
          value: ss,
        })),
      },
    ],
    editCallback(fields) {
      return {
        ...props.character,
        socialStanding: fields[0].value as SocialStanding,
      }
    },
  })

const openImprovementPointsSidebar = () =>
  props.openSidebarFn({
    name: t('character.improvementPoints'),
    deletable: false,
    fields: [
      {
        value: props.character.improvementPoints,
        input: 'PositiveNumber',
      },
    ],
    editCallback(fields) {
      return {
        ...props.character,
        improvementPoints: fields[0].value as number,
      }
    },
  })
</script>
