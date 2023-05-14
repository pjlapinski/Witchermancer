<template lang="pug">
main#character-creation
  #character-creation-stage
    button.stage-btn(:disabled='creationStep === 0', @click='--creationStep') &lsaquo;
    span.color-5 {{ $t(`characterCreation.step.${creationStep}`) }}
    button.stage-btn(:disabled='creationStep === 5', @click='++creationStep') &rsaquo;
  character-creation-first-stage(
    v-if='creationStep === 0',
    :character='character',
    @add-perk='handleAddRacialPerk',
    @remove-perk='handleRemoveRacialPerk'
  )
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import { ref, reactive } from 'vue'
import { createDefaultCharacter } from '@/domain/utility/character'
import CharacterCreationFirstStage from '@/components/createCharacter/CharacterCreationFirstStage.vue'

const character = reactive<Character>(createDefaultCharacter())
const creationStep = ref<number>(0)

const handleAddRacialPerk = () => {
  character.race.perks.push({ name: '', description: '' })
}
const handleRemoveRacialPerk = () => {
  if (character.race.perks.length > 1) {
    character.race.perks.pop()
  }
}
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
</style>
