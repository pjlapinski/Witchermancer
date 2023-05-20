<template lang="pug">
section#skills-section.character-sheet-section
  template(v-for='stat in AllStatistics')
    .item-row.py-2.bg-2(@click='emit("open-stat", stat.toLowerCase())')
      h2 {{ $t(`character.statistic.${stat.toLowerCase()}`) }}
      h2(v-if='stat !== "Luck"') {{ getStatistic(character, stat.toLowerCase()) }}
      h2(v-else) {{ character.statistics.luck.current }} / {{ character.statistics.luck.level }}
    .item-row(
      v-for='(_, name) in (character.statistics[stat.toLowerCase() as keyof Statistics] as StatisticWithSkills).skills',
      @click='emit("open-skill", stat.toLowerCase(), name)'
    )
      h3 {{  $t(`character.skill.${firstLetterLowerCase(name as string)}`)  }}
      h3 {{  getSkill(character, stat.toLowerCase(), name as string)  }}
    .item-row(
      v-if='character.profession.definingSkill.statistic === stat',
      @click='emit("open-defining")'
    ) 
      |
      h3 {{ character.profession.definingSkill.name }}
      h3 {{ character.profession.definingSkill.level }}
    template(v-for='(profSkill, i) in character.profession.abilities')
      .item-row(
        v-if='profSkill.statistic === stat',
        @click='emit("open-prof", `profSkill${i}`)'
      ) 
      h3 {{ profSkill.name }}
      h3 {{ profSkill.level }}
</template>
<script setup lang="ts">
import type {
  Character,
  StatisticWithSkills,
  Statistics,
} from '@/domain/types/character'
import { AllStatistics } from '@/domain/types/statistic'
import { firstLetterLowerCase } from '@/domain/utility/string'
import { getStatistic, getSkill } from '@/domain/utility/character'

const props = defineProps<{ character: Character }>()
const emit = defineEmits([
  'open-stat',
  'open-skill',
  'open-defining',
  'open-prof',
])
</script>
<style scoped lang="scss">
h3,
h2 {
  font-weight: normal;
}
</style>
