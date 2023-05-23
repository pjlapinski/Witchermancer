<template lang="pug">
section.character-creation-stage-content
  input.input-h3(v-model='character.name', :placeholder='$t("character.name")')
  h2.mt-3 {{ $t('character.age') }}
  positive-input.input-h3(v-model='character.age')
  input.input-h3(
    v-model='character.gender',
    :placeholder='$t("character.gender")'
  )
  input.input-h3(
    v-model='character.reputation',
    :placeholder='$t("character.reputation")'
  )
  h2.mt-3 {{ $t('character.socialStanding.name') }}
  select.input-h3(v-model='character.socialStanding')
    option(v-for='standing in AllSocialStandings', :value='standing') {{ $t(`character.socialStanding.${standing.toLocaleLowerCase()}`) }}
  resize-textarea.textarea-h3(
    v-model='character.lifePath',
    :placeholder='$t("character.lifePath")'
  )
</template>

<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import PositiveInput from '@/components/utility/PositiveInput.vue'
import { AllSocialStandings } from '@/domain/types/social'

const props = defineProps<{ character: Character }>()
</script>
