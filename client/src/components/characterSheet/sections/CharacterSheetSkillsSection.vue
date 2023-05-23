<template lang="pug">
section#skills-section.character-sheet-section
  template(v-for='stat in AllStatistics')
    .item-row.py-2.bg-2(@click='openStatisticSidebar(stat)')
      h2 {{ $t(`character.statistic.${stat.toLowerCase()}`) }}
      h2(v-if='stat !== "Luck"') {{ getStatistic(character, stat.toLowerCase()) }}
      h2(v-else) {{ character.statistics.luck.current }} / {{ getStatistic(character, stat.toLowerCase()) }}
    .item-row(
      v-for='(_, name) in (character.statistics[stat.toLowerCase() as keyof Statistics] as StatisticWithSkills).skills',
      @click='openSkillSidebar(stat, name as string)'
    )
      h3 {{  $t(`character.skill.${firstLetterLowerCase(name as string)}`)  }}
      h3 {{  getSkill(character, stat.toLowerCase(), name as string)  }}
    .item-row(
      v-if='character.profession.definingSkill.statistic === stat',
      @click='openDefiningSkillSidebar(props, t)'
    ) 
      h3 {{ character.profession.definingSkill.name }}
      h3 {{ character.profession.definingSkill.level }}
    template(v-for='(profAbility, i) in character.profession.abilities')
      .item-row(
        v-if='profAbility.statistic === stat',
        @click='openAbilitySidebar(i, props, t)'
      ) 
        h3 {{ profAbility.name }}
        h3 {{ profAbility.level }}
</template>
<script setup lang="ts">
import type {
  Character,
  StatisticWithSkills,
  Statistics,
} from '@/domain/types/character'
import { AllStatistics, type Statistic } from '@/domain/types/statistic'
import { firstLetterLowerCase } from '@/domain/utility/string'
import { getStatistic, getSkill, getModifier } from '@/domain/utility/character'
import type { OpenSidebarFn } from '@/domain/types/components/characterSheetSidebar'
import { useI18n } from 'vue-i18n'
import {
  openDefiningSkillSidebar,
  openAbilitySidebar,
} from '@/domain/utility/components/characterSheetSidebar'

const { t } = useI18n()

const props = defineProps<{
  character: Character
  openSidebarFn: OpenSidebarFn
}>()

const openStatisticSidebar = (stat: Statistic) =>
  stat === 'Luck' ? openLuckSidebar() : openNormalStatisticSidebar(stat)

const openLuckSidebar = () => {
  props.openSidebarFn({
    name: t('character.statistic.luck'),
    deletable: false,
    fields: [
      {
        displayName: t('character.generic.currentValue'),
        value: props.character.statistics.luck.current,
        input: 'PositiveNumber',
      },
      {
        displayName: t('character.generic.level'),
        value: props.character.statistics.luck.level,
        input: 'PositiveNumber',
      },
      {
        displayName: t('character.generic.bonus'),
        value: getModifier(props.character, 'luck'),
        input: 'Number',
      },
    ],
    editCallback(fields) {
      const modifiers = { ...props.character.modifiers }
      modifiers['luck'] = fields[2].value as number
      return {
        ...props.character,
        statistics: {
          ...props.character.statistics,
          luck: {
            current: fields[0].value as number,
            level: fields[1].value as number,
          },
        },
        modifiers,
      }
    },
  })
}

const openNormalStatisticSidebar = (stat: Statistic) => {
  const lowercase = stat.toLowerCase()
  props.openSidebarFn({
    name: t(`character.statistic.${lowercase}`),
    deletable: false,
    fields: [
      {
        displayName: t('character.generic.level'),
        value: props.character.statistics[lowercase as keyof Statistics].level,
        input: 'PositiveNumber',
      },
      {
        displayName: t('character.generic.bonus'),
        value: getModifier(props.character, lowercase),
        input: 'Number',
      },
    ],
    editCallback(fields) {
      const statistics = { ...props.character.statistics }
      statistics[lowercase as keyof Statistics].level = fields[0]
        .value as number
      const modifiers = { ...props.character.modifiers }
      modifiers[lowercase] = fields[1].value as number
      return {
        ...props.character,
        statistics,
        modifiers,
      }
    },
  })
}

const openSkillSidebar = (stat: Statistic, skill: string) => {
  const statistic = stat.toLowerCase()
  const skillName = firstLetterLowerCase(skill)
  const obj = (
    props.character.statistics[
      statistic as keyof Statistics
    ] as StatisticWithSkills
  ).skills[skill]
  props.openSidebarFn({
    name: t(`character.skill.${skillName}`),
    description: obj.difficult ? t('character.difficultSkill') : undefined,
    deletable: false,
    fields: [
      {
        displayName: t('character.generic.level'),
        value: obj.level,
        input: 'PositiveNumber',
      },
      {
        displayName: t('character.generic.bonus'),
        value: getModifier(props.character, skill),
        input: 'Number',
      },
    ],
    editCallback(fields) {
      const statistics: Statistics = { ...props.character.statistics }
      const s = (statistics[statistic as keyof Statistics] as StatisticWithSkills)
      s.skills[skill].level = fields[0].value as number
      const modifiers = { ...props.character.modifiers }
      modifiers[skill] = fields[1].value as number
      return { ...props.character, statistics, modifiers }
    },
  })
}
</script>
