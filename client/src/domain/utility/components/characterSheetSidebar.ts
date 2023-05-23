import { ComposerTranslation } from "vue-i18n"
import { AllStatistics, type Statistic } from "@/domain/types/statistic"
import type { Character } from "@/domain/types/character"
import type { OpenSidebarFn } from "@/domain/types/components/characterSheetSidebar"

export const openDefiningSkillSidebar = (props: {
  character: Character
  openSidebarFn: OpenSidebarFn
}, t: ComposerTranslation) => {
  const skill = props.character.profession.definingSkill
  props.openSidebarFn({
    name: skill.name,
    deletable: false,
    description: skill.description,
    fields: [
      {
        displayName: t('character.generic.name'),
        input: 'Text',
        value: skill.name,
      },
      {
        displayName: t('character.generic.description'),
        input: 'TextArea',
        value: skill.description,
      },
      {
        displayName: t('character.generic.level'),
        input: 'PositiveNumber',
        value: skill.level,
      },
      {
        displayName: t('character.statistic.name'),
        input: 'Select',
        value: skill.statistic,
        selectOptions: AllStatistics.map(stat => ({
          text: t(`character.statistic.${stat.toLowerCase()}`),
          value: stat,
        })),
      },
    ],
    editCallback(fields) {
      const newSkill = {
        name: fields[0].value as string,
        description: fields[1].value as string,
        level: fields[2].value as number,
        statistic: fields[3].value as Statistic,
      }
      const profession = {
        ...props.character.profession,
        definingSkill: newSkill,
      }
      return {
        ...props.character,
        profession,
      }
    },
  })
}

export const openAbilitySidebar = (idx: number, props: {
  character: Character
  openSidebarFn: OpenSidebarFn
}, t: ComposerTranslation) => {
  const ability = props.character.profession.abilities[idx]
  props.openSidebarFn({
    name: ability.name,
    deletable: true,
    description: ability.description,
    fields: [
      {
        displayName: t('character.generic.name'),
        input: 'Text',
        value: ability.name,
      },
      {
        displayName: t('character.generic.description'),
        input: 'TextArea',
        value: ability.description,
      },
      {
        displayName: t('character.generic.level'),
        input: 'PositiveNumber',
        value: ability.level,
      },
      {
        displayName: t('character.statistic.name'),
        input: 'Select',
        value: ability.statistic,
        selectOptions: AllStatistics.map(stat => ({
          text: t(`character.statistic.${stat.toLowerCase()}`),
          value: stat,
        })),
      },
    ],
    editCallback(fields) {
      const newAbility = {
        name: fields[0].value as string,
        description: fields[1].value as string,
        level: fields[2].value as number,
        statistic: fields[3].value as Statistic,
      }
      const profession = props.character.profession
      profession.abilities[idx] = newAbility
      return {
        ...props.character,
        profession,
      }
    },
    deleteCallback() {
      const abilities = props.character.profession.abilities
      abilities.splice(idx, 1)
      const profession = {
        ...props.character.profession,
        perks: abilities,
      }
      return {
        ...props.character,
        profession,
      }
    },
  })
}