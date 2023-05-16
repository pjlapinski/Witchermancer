<template lang="pug">
section.character-creation-stage-content
  template(v-for='(stat, i) in statistics')
    button.section-btn(@click='toggleSection(i)') 
      span {{ $t(`character.statistic.${stat.toLowerCase()}`) }}
      span {{ isSectionOpen(i) ? '&#11206' : '&#11208' }}
    section(v-show='isSectionOpen(i)')
      div(
        v-for='(skill, name) in (character.statistics[stat.toLocaleLowerCase() as keyof Statistics] as StatisticWithSkills).skills'
      )
        div {{  $t(`character.skill.${firstLetterLowerCase(name as string)}`) + (skill.difficult ? '*' : '')  }} {{ skill.level }}
</template>

<script setup lang="ts">
import type {
  Character,
  Statistics,
  StatisticWithSkills,
} from '@/domain/types/character'
import type { Language } from '@/domain/types/language'
import { AllStatistics } from '@/domain/types/statistic'
import { firstLetterLowerCase } from '@/domain/utility/string'
import { defineProps, ref, computed } from 'vue'

const props = defineProps<{ character: Character; nativeLang: Language }>()

const statistics = AllStatistics.filter(s => s !== 'Luck' && s !== 'Speed')

const openSections = ref<number[]>([])
const professionSkills = ref<string[]>([])

const isSectionOpen = (num: number) => openSections.value.indexOf(num) > -1
const toggleSection = (num: number) => {
  const idx = openSections.value.indexOf(num)
  if (idx > -1) {
    openSections.value.splice(idx, 1)
  } else {
    openSections.value.push(num)
  }
}

const professionPointsAvailable = computed(() => {
  let sum = 0
  for (const stat in statistics) {
    const skills = (
      props.character.statistics[
        stat as keyof typeof props.character.statistics
      ] as StatisticWithSkills
    ).skills

    for (const skill in skills) {
      if (!professionSkills.value.includes(skill)) {
        continue
      }

      sum += skills[skill].level * (+skills[skill].difficult + 1)
    }
  }
  return 44 - sum
})
const pickUpPointsUsed = computed(() => {
  let sum = 0
  for (const stat in statistics) {
    const skills = (
      props.character.statistics[
        stat as keyof typeof props.character.statistics
      ] as StatisticWithSkills
    ).skills

    for (const skill in skills) {
      if (professionSkills.value.includes(skill)) {
        continue
      }
      sum += skills[skill].level * (+skills[skill].difficult + 1)
      if (props.nativeLang === skill) {
        sum -= 16 // initial 8 levels of the native language are free, languages are difficult, so -16
      }
    }
  }

  return sum
})
const pickUpPointsMax = computed(
  () =>
    props.character.statistics.intelligence.level +
    props.character.statistics.reflex.level,
)
</script>

<style lang="scss">
.section-btn {
  @extend .btn-subtle, .d-flex;

  width: 60%;
  align-self: center;
  justify-content: space-between;
}
</style>
