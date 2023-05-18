<template lang="pug">
section.character-creation-stage-content
  input.input-h3(
    v-model='character.race.name',
    :placeholder='$t("characterCreation.step0.raceName")'
  )
  h2.mt-3 {{ $t('characterCreation.step0.nativeLang') }}
  select.input-h3(@change='emit("lang-changed", ($event.target as HTMLSelectElement).value as Language)')
    option(v-for='lang in AllLanguages', :value='lang') {{ $t(`character.skill.${firstLetterLowerCase(lang)}`) }}
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
      resize-textarea.textarea-h3(
        :placeholder='$t("characterCreation.step0.perkDesc")',
        v-model='perk.description'
      )
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import { AllLanguages, type Language } from '@/domain/types/language'
import { firstLetterLowerCase } from '@/domain/utility/string'

const props = defineProps<{ character: Character; nativeLang: Language }>()
const emit = defineEmits(['add-perk', 'remove-perk', 'lang-changed'])
</script>
