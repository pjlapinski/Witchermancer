<template lang="pug">
section.character-creation-stage-content
  input.input-h3(
    v-model='props.character.name',
    :placeholder='$t("characterCreation.step0.raceName")'
  )
  h2.mt-3 {{ $t('characterCreation.step0.perkListHeader') }}
  .btns-large-wrapper
    button.btn-large(@click='emit("add-perk")') +
    button.btn-large(@click='emit("remove-perk")') -
  .items-list
    .fields-collection(v-for='perk in character.race.perks')
      input.input-h3(
        :placeholder='$t("characterCreation.step0.perkName")',
        v-model='perk.name'
      )
      textarea.textarea-h3(
        :placeholder='$t("characterCreation.step0.perkDesc")',
        v-model='perk.description'
      )
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{ character: Character }>()
const emit = defineEmits(['add-perk', 'remove-perk'])
</script>
