<template lang="pug">
section.character-creation-stage-content
  section.counters
    h3(:class='{ "color-5": professionPointsAvailable < 0 }') {{ $t('characterCreation.step4.professionSkillPoints', { pts: professionPointsAvailable }) }}
    h3(:class='{ "color-5": pickUpPointsAvailable < 0 }') {{ $t('characterCreation.step4.pickUpSkillPoints', { pts: pickUpPointsAvailable }) }}
  template(v-for='(stat, i) in statistics')
    button.section-btn(@click='toggleSection(i)') 
      span {{ $t(`character.statistic.${stat.toLowerCase()}`) }}
      span {{ isSectionOpen(i) ? '&#11206' : '&#11208' }}
    section.skills-section(
      :class='{ "skills-section-hidden": !isSectionOpen(i) }'
    )
      .skill-row(
        v-for='(skill, name) in (character.statistics[stat.toLocaleLowerCase() as keyof Statistics] as StatisticWithSkills).skills'
      )
        input(
          type='checkbox',
          :checked="professionSkills.includes(name as string)"
          @change='$emit("toggle-profession-skill", name, skill)',
          :id='`skill-${name}`'
        )
        label.flex-grow-1(:for='`skill-${name}`') {{  $t(`character.skill.${firstLetterLowerCase(name as string)}`) + (skill.difficult ? '*' : '')  }}
        positive-input.input-h3(type='number', v-model='skill.level')
      .skill-row(v-if='character.profession.definingSkill.statistic === stat')
        label.flex-grow-1 {{ character.profession.definingSkill.name }}
        positive-input.input-h3(type='number', v-model='character.profession.definingSkill.level')
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
import { ref, computed } from 'vue'
import PositiveInput from '@/components/utility/PositiveInput.vue'

const props = defineProps<{
  character: Character
  nativeLang: Language
  professionSkills: string[]
}>()
const emit = defineEmits(['toggle-profession-skill'])

const statistics = AllStatistics.filter(s => s !== 'Luck' && s !== 'Speed')

const openSections = ref<number[]>([])

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
  for (const stat of statistics) {
    const skills = (
      props.character.statistics[
        stat.toLocaleLowerCase() as keyof typeof props.character.statistics
      ] as StatisticWithSkills
    ).skills

    for (const skill in skills) {
      if (!props.professionSkills.includes(skill)) {
        continue
      }

      sum += skills[skill].level * (+skills[skill].difficult + 1)
    }
  }
  return 44 - sum - props.character.profession.definingSkill.level
})
const pickUpPointsAvailable = computed(() => {
  const max =
    props.character.statistics.intelligence.level +
    props.character.statistics.reflex.level

  let sum = 0
  for (const stat of statistics) {
    const skills = (
      props.character.statistics[
        stat.toLocaleLowerCase() as keyof typeof props.character.statistics
      ] as StatisticWithSkills
    ).skills

    for (const skill in skills) {
      if (props.professionSkills.includes(skill)) {
        continue
      }
      sum += skills[skill].level * (+skills[skill].difficult + 1)
      if (props.nativeLang === skill) {
        sum -= 16 // initial 8 levels of the native language are free, languages are difficult, so -16
      }
    }
  }
  return max - sum
})
</script>

<style scoped lang="scss">
$transition-duration: 0.2s;

h3 {
  font-weight: normal;
}

.narrow-spread {
  width: 80%;
  align-self: center;
  justify-content: space-between;
}

.section-btn {
  @extend .btn-subtle, .d-flex, .narrow-spread;
}

.skills-section {
  @extend .narrow-spread, .d-flex, .flex-col;

  gap: 2px;
  transform-origin: top;
  max-height: 100vh;

  transition: all ease-in-out $transition-duration;
}

.skills-section-hidden {
  max-height: 0;
  scale: 1 0;
  transition: all ease-in-out $transition-duration;
}

.skill-row {
  @extend .d-flex;

  text-align: left;
  align-items: center;
  gap: 1rem;

  & input[type='number'] {
    width: 2rem;
  }
}

input[type='checkbox'] {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;

  font: inherit;
  color: currentColor;
  width: 1.5rem;
  height: 1.5rem;
  display: grid;
  place-content: center;
  background-color: var(--color-2);

  &::before {
    content: '';
  }

  &:checked::before {
    content: '\2713';
  }
}
</style>
