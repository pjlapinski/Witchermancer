<template lang="pug">
section.character-creation-stage-content
  .statistic(v-for='stat in AllStatistics')
    label(:for='`stat-${stat.toLowerCase()}`') {{ $t(`character.statistic.${stat.toLowerCase()}`) }}
    positive-input.input-h3(
      type='number',
      :id='`stat-${stat.toLowerCase()}`',
      v-model='character.statistics[stat.toLocaleLowerCase() as keyof Statistics].level'
    )
</template>
<script setup lang="ts">
import type { Character, Statistics } from '@/domain/types/character'
import { defineProps } from 'vue'
import { AllStatistics } from '@/domain/types/statistic'
import PositiveInput from '@/components/utility/PositiveInput.vue'

const props = defineProps<{ character: Character }>()
</script>

<style scoped lang="scss">
.statistic {
  @extend .d-flex;

  align-items: center;
  justify-content: space-between;

  & label {
    @extend .h3;
  }

  & input {
    width: 20%;
  }
}
</style>
