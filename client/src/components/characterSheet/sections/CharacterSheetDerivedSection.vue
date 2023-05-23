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
    h3 1{{ $t('character.generic.dieRollSymbol') }}6{{ getKickDamage(character).modifier >= 0 ? '+' : '' }}{{ getKickDamage(character).modifier }}
  .item-row(@click='openPunchSidebar')
    h3 {{ $t('character.punch') }}
    h3 1{{ $t('character.generic.dieRollSymbol') }}6{{ getPunchDamage(character).modifier >= 0 ? '+' : '' }}{{ getPunchDamage(character).modifier }}
</template>

<script setup lang="ts">
import type { Character } from '@/domain/types/character'
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  character: Character
  openSidebarFn: OpenSidebarFn
}>()

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
</script>
