<template lang="pug">
section.character-creation-stage-content
  input.input-h3(
    v-model='props.character.profession.name',
    :placeholder='$t("characterCreation.step1.professionName")'
  )
  h2.mt-3 {{ $t('character.vigor') }}
  input.input-h3(type='number')(v-model='props.character.profession.vigor')
  h2.mt-3 {{ $t('character.definingSkill') }}
  .fields-collection
    input.input-h3(
      :placeholder='$t("characterCreation.step1.definingSkillName")',
      v-model='props.character.profession.definingSkill.name'
    )
    textarea.textarea-h3(
      :placeholder='$t("characterCreation.step1.definingSkillDesc")',
      v-model='props.character.profession.definingSkill.description'
    )
    select.input-h3(
      v-model='props.character.profession.definingSkill.statistic'
    )
      option(v-for='stat in AllStatistics', :value='stat') {{ $t(`character.statistic.${stat.toLowerCase()}`) }}
</template>

<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import { AllStatistics } from '@/domain/types/statistic'
import { defineProps } from 'vue'

const props = defineProps<{ character: Character }>()
</script>
