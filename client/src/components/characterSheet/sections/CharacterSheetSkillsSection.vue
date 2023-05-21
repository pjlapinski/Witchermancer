<template lang="pug">
section#skills-section.character-sheet-section
  template(v-for='stat in AllStatistics')
    .item-row.py-2.bg-2(@click='')
      h2 {{ $t(`character.statistic.${stat.toLowerCase()}`) }}
      h2(v-if='stat !== "Luck"') {{ getStatistic(character, stat.toLowerCase()) }}
      h2(v-else) {{ character.statistics.luck.current }} / {{ character.statistics.luck.level }}
    .item-row(
      v-for='(_, name) in (character.statistics[stat.toLowerCase() as keyof Statistics] as StatisticWithSkills).skills',
      @click=''
    )
      h3 {{  $t(`character.skill.${firstLetterLowerCase(name as string)}`)  }}
      h3 {{  getSkill(character, stat.toLowerCase(), name as string)  }}
    .item-row(
      v-if='character.profession.definingSkill.statistic === stat',
      @click=''
    ) 
      h3 {{ character.profession.definingSkill.name }}
      h3 {{ character.profession.definingSkill.level }}
    template(v-for='(profSkill, i) in character.profession.abilities')
      .item-row(v-if='profSkill.statistic === stat', @click='') 
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
import type { OpenSidebarFn } from '@/domain/types/components/characterSheetSidebar'

const props = defineProps<{
  character: Character
  openSidebarFn: OpenSidebarFn
}>()
</script>
