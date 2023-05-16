<template lang="pug">
main#character-creation
  #character-creation-stage
    button.stage-btn(:disabled='creationStep === 0', @click='--creationStep') &lsaquo;
    span.color-5 {{ $t(`characterCreation.step.${creationStep}`) }}
    button.stage-btn(:disabled='creationStep === 6', @click='++creationStep') &rsaquo;
  character-creation-race-stage(
    v-if='creationStep === 0',
    :character='character',
    :native-lang='nativeLang',
    @lang-changed='handleLangChanged',
    @add-perk='handleAddRacialPerk',
    @remove-perk='handleRemoveRacialPerk'
  )
  character-creation-profession-stage(
    v-if='creationStep === 1',
    :character='character'
  )
  character-creation-magic-stage(
    v-if='creationStep === 2',
    :character='character',
    @add-spell='handleAddSpell',
    @remove-spell='handleRemoveSpell',
    @add-hex='handleAddHex',
    @remove-hex='handleRemoveHex',
    @add-ritual='handleAddRitual',
    @remove-ritual='handleRemoveRitual'
  )
  character-creation-statistics-stage(
    v-if='creationStep === 3',
    :character='character'
  )
  character-creation-skills-stage(
    v-if='creationStep === 4',
    :character='character',
    :native-lang='nativeLang'
  )
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { createDefaultCharacter } from '@/domain/utility/character'
import CharacterCreationRaceStage from '@/components/createCharacter/CharacterCreationRaceStage.vue'
import CharacterCreationProfessionStage from '@/components/createCharacter/CharacterCreationProfessionStage.vue'
import CharacterCreationMagicStage from '@/components/createCharacter/CharacterCreationMagicStage.vue'
import CharacterCreationStatisticsStage from '@/components/createCharacter/CharacterCreationStatisticsStage.vue'
import CharacterCreationSkillsStage from '@/components/createCharacter/CharacterCreationSkillsStage.vue'
import type { Language } from '@/domain/types/language'

const character = reactive(createDefaultCharacter())
const nativeLang = ref<Language>('CommonSpeech')
const creationStep = ref(0)

const handleLangChanged = (lang: Language) => {
  character.statistics.intelligence.skills[nativeLang.value].level =
    character.statistics.intelligence.skills[lang].level
  nativeLang.value = lang
  character.statistics.intelligence.skills[nativeLang.value].level = 8
}

const handleAddRacialPerk = () =>
  character.race.perks.push({ name: '', description: '' })
const handleRemoveRacialPerk = () => {
  if (character.race.perks.length > 1) {
    character.race.perks.pop()
  }
}
const handleAddSpell = () =>
  character.spells.push({ name: '', cost: '', effect: '', range: '' })
const handleRemoveSpell = () => character.spells.pop()

const handleAddHex = () => {
  character.hexes.push({ name: '', cost: '', effect: '' })
}
const handleRemoveHex = () => character.hexes.pop()

const handleAddRitual = () => {
  character.rituals.push({
    name: '',
    components: '',
    cost: '',
    difficultyClass: '',
    effect: '',
    time: '',
  })
}
const handleRemoveRitual = () => character.rituals.pop()
</script>
<style lang="scss">
.character-creation-stage-content {
  @extend .d-flex, .flex-col;

  gap: 1vh;
}

#character-creation {
  @extend .d-flex, .flex-col, .text-center, .p-3, .mx-auto;

  align-items: stretch;
  width: 90%;
}

.color-5 {
  color: var(--color-5);
}

.stage-btn {
  @extend .btn-subtle, .color-5, .px-5;

  &:disabled {
    color: var(--color-3);
    cursor: default;
  }
}

#character-creation-stage {
  @extend .d-flex, .h1, .mb-5;

  justify-content: space-between;
  align-items: center;
  background-color: var(--color-2);
}

@media only screen and (min-width: 768px) {
  #character-creation {
    width: 40%;
  }
}

.input-h3 {
  @extend .input, .h3;
}

.textarea-h3 {
  @extend .input-h3;

  resize: none;
}

.items-list {
  @extend .d-flex, .flex-col;

  gap: 1vh;
}

.fields-collection {
  @extend .d-flex, .flex-col;

  gap: 2px;
}

.btn-large {
  @extend .btn, .h3;

  flex-grow: 1;
}

.btns-large-wrapper {
  @extend .d-flex;

  gap: #{sizeof(2)};
}

h2 {
  font-weight: normal;
}
</style>
