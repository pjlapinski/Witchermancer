<template lang="pug">
section#derived-section.character-sheet-section
  .item-row.mt-3(@click='')
    h3 {{ $t('character.healthPoints') }}
    h3 {{ character.currentHealthPoints }} / {{ getHealthPoints(character) }}
  .item-row(@click='')
    h3 {{ $t('character.stun') }}
    h3 {{ character.currentStun }} / {{ getStunScore(character) }}
  .item-row(@click='')
    h3 {{ $t('character.stamina') }}
    h3 {{ character.currentStamina }} / {{ getStaminaScore(character) }}
  .item-row(@click='')
    h3 {{ $t('character.recovery') }}
    h3 {{ getRecoveryScore(character) }}
  .item-row(@click='')
    h3 {{ $t('character.woundThreshold') }}
    h3 {{ getWoundThreshold(character) }}
  .item-row(@click='')
    h3 {{ $t('character.run') }}
    h3 {{ getRunScore(character) }}m
  .item-row(@click='')
    h3 {{ $t('character.leap') }}
    h3 {{ getLeapScore(character) }}m
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import type { OpenSidebarFn } from '@/domain/types/components/characterSheetSidebar'
import {
  getLeapScore,
  getStunScore,
  getRunScore,
  getHealthPoints,
  getStaminaScore,
  getRecoveryScore,
  getWoundThreshold,
} from '@/domain/utility/character'

const props = defineProps<{
  character: Character
  openSidebarFn: OpenSidebarFn
}>()
</script>
