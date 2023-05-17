<template lang="pug">
section.character-creation-stage-content
  input.input-h3(
    v-model='character.profession.name',
    :placeholder='$t("characterCreation.step1.professionName")'
  )
  h2.mt-3 {{ $t('character.vigor') }}
  positive-input.input-h3(type='number')(v-model='character.profession.vigor')
  h2.mt-3 {{ $t('character.definingSkill') }}
  .fields-collection
    input.input-h3(
      :placeholder='$t("characterCreation.step1.definingSkillName")',
      v-model='character.profession.definingSkill.name'
    )
    resize-textarea.textarea-h3(
      :placeholder='$t("characterCreation.step1.definingSkillDesc")',
      v-model='character.profession.definingSkill.description'
    )
    select.input-h3(v-model='character.profession.definingSkill.statistic')
      option(v-for='stat in AllStatistics', :value='stat') {{ $t(`character.statistic.${stat.toLowerCase()}`) }}
</template>

<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import { AllStatistics } from '@/domain/types/statistic'
import PositiveInput from '@/components/utility/PositiveInput.vue'
import { defineProps } from 'vue'

const props = defineProps<{ character: Character }>()
</script>
