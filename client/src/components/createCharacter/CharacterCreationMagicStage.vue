<template lang="pug">
section.character-creation-stage-content
  h2 {{ $t('character.magic.spells') }}
  .btns-large-wrapper
    button.btn-large(@click='emit("add-spell")') +
    button.btn-large(@click='emit("remove-spell")') -
  .items-list
    .fields-collection(v-for='(spell, i) in character.spells')
      input.input-h3(
        v-model='spell.name',
        :placeholder='$t("character.magic.name")'
      )
      input.input-h3(
        v-model='spell.range',
        :placeholder='$t("character.magic.range")'
      )
      input.input-h3(
        v-model='spell.cost',
        :placeholder='$t("character.magic.cost")'
      )
      textarea.textarea-h3(
        v-model='spell.effect',
        :placeholder='$t("character.magic.effect")'
      )
  h2.mt-3 {{ $t('character.magic.hexes') }}
  .btns-large-wrapper
    button.btn-large(@click='emit("add-hex")') +
    button.btn-large(@click='emit("remove-hex")') -
  .items-list
    .fields-collection(v-for='hex in character.hexes')
      input.input-h3(
        v-model='hex.name',
        :placeholder='$t("character.magic.name")'
      )
      input.input-h3(
        v-model='hex.cost',
        :placeholder='$t("character.magic.cost")'
      )
      textarea.textarea-h3(
        v-model='hex.effect',
        :placeholder='$t("character.magic.effect")'
      )
  h2.mt-3 {{ $t('character.magic.rituals') }}
  .btns-large-wrapper
    button.btn-large(@click='emit("add-ritual")') +
    button.btn-large(@click='emit("remove-ritual")') -
  .items-list
    .fields-collection(v-for='ritual in character.rituals')
      input.input-h3(
        v-model='ritual.name',
        :placeholder='$t("character.magic.name")'
      )
      input.input-h3(
        v-model='ritual.cost',
        :placeholder='$t("character.magic.cost")'
      )
      input.input-h3(
        v-model='ritual.difficultyClass',
        :placeholder='$t("character.difficultyClass")'
      )
      input.input-h3(
        v-model='ritual.time',
        :placeholder='$t("character.magic.time")'
      )
      textarea.textarea-h3(
        v-model='ritual.components',
        :placeholder='$t("character.magic.components")'
      )
      textarea.textarea-h3(
        v-model='ritual.effect',
        :placeholder='$t("character.magic.effect")'
      )
</template>

<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps<{ character: Character }>()
const emit = defineEmits([
  'add-spell',
  'remove-spell',
  'add-hex',
  'remove-hex',
  'add-ritual',
  'remove-ritual',
])
</script>
