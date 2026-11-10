<template lang="pug">
section#derived-section.character-sheet-section
  h2.section-title {{ $t('characterSheet.section.derived') }}
  .item-row.mt-3(@click='openHealthSidebar')
    h3 {{ $t('character.healthPoints') }}
    h3 {{ character.currentHealthPoints }} / {{ getHealthPoints(character) }}
  .item-row(@click='openStunSidebar')
    h3 {{ $t('character.stun') }}
    h3 {{ character.currentStun }} / {{ getStunScore(character) }}
  .item-row(@click='openStaminaSidebar')
    h3 {{ $t('character.stamina') }}
    h3 {{ character.currentStamina }} / {{ getStaminaScore(character) }}
  foldable-button
    template(#button)
      h3 {{ $t('character.injuries') }}
    template(#opened)
      .item-row.cursor-default
        h3 {{ $t('character.generic.name') }}
        h3 {{ $t('character.generic.duration') }}
      .item-row(v-for='(injury, i) in character.injuries' @click='openInjurySidebar(injury, i)')
        h3 {{ injury.name }}
        h3 {{ injury.duration }}
      .split-line.mb-2.mt-1
      .d-flex.flex-col.px-5
        input.input-h3(v-model='newInjuryName' :placeholder='$t("character.generic.name")')
        textarea.mt-1.textarea-h3(v-model='newInjuryDesc' :placeholder='$t("character.generic.description")')
      .item-row.cursor-default
        h3 {{ $t('character.generic.duration') }}
        positive-input.input(v-model='newInjuryDuration')
      plus-btn(@click='addInjury')
  .item-row(@click='openRecoverySidebar')
    h3 {{ $t('character.recovery') }}
    h3 {{ getRecoveryScore(character) }}
  .item-row(@click='openWoundThresholdSidebar')
    h3 {{ $t('character.woundThreshold') }}
    h3 {{ getWoundThreshold(character) }}
  .item-row(@click='openRunSidebar')
    h3 {{ $t('character.run') }}
    h3 {{ round(getRunScore(character)) }}m
  .item-row(@click='openLeapSidebar')
    h3 {{ $t('character.leap') }}
    h3 {{ round(getLeapScore(character)) }}m
  .item-row(@click='openKickSidebar')
    h3 {{ $t('character.kick') }}
    h3 {{ formatDieRoll(getKickDamage(character), t) }}
  .item-row(@click='openPunchSidebar')
    h3 {{ $t('character.punch') }}
    h3 {{ formatDieRoll(getPunchDamage(character), t) }}
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type {Character, Injury} from '@/domain/types/character'
import type { OpenSidebarFn } from '@/domain/types/components/characterSheetSidebar'
import {
  getKickDamage,
  getPunchDamage,
  getLeapScore,
  getStunScore,
  getRunScore,
  getHealthPoints,
  getStaminaScore,
  getRecoveryScore,
  getWoundThreshold,
  getModifier,
  healthMod,
  staminaMod,
  stunMod,
  recoveryMod,
  woundThresholdMod,
  runMod,
  leapMod,
  damageMod,
} from '@/domain/utility/character'
import { round } from '@/domain/utility/math'
import { formatDieRoll } from '@/domain/utility/string'
import { useI18n } from 'vue-i18n'
import FoldableButton from "@/components/utility/FoldableButton.vue";
import PositiveInput from "@/components/utility/PositiveInput.vue";
import PlusBtn from "@/components/characterSheet/PlusBtn.vue";

const { t } = useI18n()

const props = defineProps<{
  character: Character
  openSidebarFn: OpenSidebarFn
}>()

const emit = defineEmits(['add-injury'])

const newInjuryName = ref<string>()
const newInjuryDesc = ref<string>()
const newInjuryDuration = ref<number>(0)

const openHealthSidebar = () =>
  props.openSidebarFn({
    name: t('character.healthPoints'),
    deletable: false,
    fields: [
      {
        displayName: t('character.currentHealthPoints'),
        value: props.character.currentHealthPoints,
        input: 'PositiveNumber',
      },
      {
        displayName: t('character.bonusHealthPoints'),
        value: getModifier(props.character, healthMod),
        input: 'Number',
      },
    ],
    editCallback(fields) {
      const mods = { ...props.character.modifiers }
      mods[healthMod] = fields[1].value as number
      return {
        ...props.character,
        currentHealthPoints: fields[0].value as number,
        modifiers: mods,
      }
    },
  })

const openStunSidebar = () =>
  props.openSidebarFn({
    name: t('character.stun'),
    deletable: false,
    fields: [
      {
        displayName: t('character.currentStun'),
        value: props.character.currentStun,
        input: 'PositiveNumber',
      },
      {
        displayName: t('character.bonusStun'),
        value: getModifier(props.character, stunMod),
        input: 'Number',
      },
    ],
    editCallback(fields) {
      const mods = { ...props.character.modifiers }
      mods[stunMod] = fields[1].value as number
      return {
        ...props.character,
        currentStun: fields[0].value as number,
        modifiers: mods,
      }
    },
  })

const openStaminaSidebar = () =>
  props.openSidebarFn({
    name: t('character.stamina'),
    deletable: false,
    fields: [
      {
        displayName: t('character.currentStamina'),
        value: props.character.currentStamina,
        input: 'PositiveNumber',
      },
      {
        displayName: t('character.bonusStamina'),
        value: getModifier(props.character, staminaMod),
        input: 'Number',
      },
    ],
    editCallback(fields) {
      const mods = { ...props.character.modifiers }
      mods[staminaMod] = fields[1].value as number
      return {
        ...props.character,
        currentStamina: fields[0].value as number,
        modifiers: mods,
      }
    },
  })

const openRecoverySidebar = () =>
  props.openSidebarFn({
    name: t('character.recovery'),
    deletable: false,
    fields: [
      {
        displayName: t('character.bonusRecovery'),
        input: 'Number',
        value: getModifier(props.character, recoveryMod),
      },
    ],
    editCallback(fields) {
      const mods = { ...props.character.modifiers }
      mods[recoveryMod] = fields[0].value as number
      return {
        ...props.character,
        modifiers: mods,
      }
    },
  })

const openWoundThresholdSidebar = () =>
  props.openSidebarFn({
    name: t('character.woundThreshold'),
    deletable: false,
    fields: [
      {
        displayName: t('character.bonusWoundThreshold'),
        input: 'Number',
        value: getModifier(props.character, woundThresholdMod),
      },
    ],
    editCallback(fields) {
      const mods = { ...props.character.modifiers }
      mods[woundThresholdMod] = fields[0].value as number
      return {
        ...props.character,
        modifiers: mods,
      }
    },
  })

const openRunSidebar = () =>
  props.openSidebarFn({
    name: t('character.run'),
    deletable: false,
    fields: [
      {
        displayName: t('character.bonusRun'),
        input: 'Number',
        value: getModifier(props.character, runMod),
      },
    ],
    editCallback(fields) {
      const mods = { ...props.character.modifiers }
      mods[runMod] = fields[0].value as number
      return {
        ...props.character,
        modifiers: mods,
      }
    },
  })

const openLeapSidebar = () =>
  props.openSidebarFn({
    name: t('character.leap'),
    deletable: false,
    fields: [
      {
        displayName: t('character.bonusLeap'),
        input: 'Number',
        value: getModifier(props.character, leapMod),
      },
    ],
    editCallback(fields) {
      const mods = { ...props.character.modifiers }
      mods[leapMod] = fields[0].value as number
      return {
        ...props.character,
        modifiers: mods,
      }
    },
  })

const openKickSidebar = () =>
  props.openSidebarFn({
    name: t('character.kick'),
    deletable: false,
    fields: [
      {
        displayName: t('character.bonusDamage'),
        input: 'Number',
        value: getModifier(props.character, damageMod),
      },
    ],
    editCallback(fields) {
      const mods = { ...props.character.modifiers }
      mods[damageMod] = fields[0].value as number
      return {
        ...props.character,
        modifiers: mods,
      }
    },
  })

const openPunchSidebar = () =>
  props.openSidebarFn({
    name: t('character.punch'),
    deletable: false,
    fields: [
      {
        displayName: t('character.bonusDamage'),
        input: 'Number',
        value: getModifier(props.character, damageMod),
      },
    ],
    editCallback(fields) {
      const mods = { ...props.character.modifiers }
      mods[damageMod] = fields[0].value as number
      return {
        ...props.character,
        modifiers: mods,
      }
    },
  })

const openInjurySidebar = (injury: Injury, idx: number) => 
    props.openSidebarFn({
      name: injury.name,
      deletable: true,
      fields: [
        {
          displayName: t('character.generic.name'),
          input: 'Text',
          value: injury.name
        },
        {
          displayName: t('character.generic.description'),
          input: 'TextArea',
          value: injury.description
        },
        {
          displayName: t('character.generic.duration'),
          input: 'PositiveNumber',
          value: injury.duration
        },
      ],
      editCallback(fields) {
        const inj = [...props.character.injuries]
        inj[idx] = {
          name: fields[0].value as string,
          description: fields[1].value as string,
          duration: fields[2].value as number,
        }
        return {
          ...props.character,
          injuries: inj,
        }
      },
      deleteCallback() {
        const inj = [...props.character.injuries]
        inj.splice(idx, 1)
        return {
          ...props.character,
          injuries: inj
        }
      }
    })

const addInjury = () => {
  if (newInjuryDuration.value! <= 0) return;
  emit('add-injury', {
    name: newInjuryName.value!,
    description: newInjuryDesc.value!,
    duration: newInjuryDuration.value!,
  })
  newInjuryName.value = ''
  newInjuryDesc.value = ''
  newInjuryDuration.value = 0
}
</script>
