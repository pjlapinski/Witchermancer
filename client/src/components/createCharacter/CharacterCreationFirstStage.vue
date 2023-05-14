<template lang="pug">
.character-creation-stage-content
  input#character-name(
    v-model='props.character.name',
    :placeholder='$t("characterCreation.step0.raceName")'
  )
  h2.mt-3 {{ $t('characterCreation.step0.perkListHeader') }}
  .plus-minus-wrapper
    button.plus-minus-btn(@click='emit("add-perk")') +
    button.plus-minus-btn(@click='emit("remove-perk")') -
  .perk-list
    .perk(v-for='perk in character.race.perks')
      input.perk-name(
        :placeholder='$t("characterCreation.step0.perkName")',
        v-model='perk.name'
      )
      textarea.perk-desc(
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
<style scoped lang="scss">
#character-name {
  @extend .input, .h3;
}

h2 {
  font-weight: normal;
}

.perk-list,
.perk {
  @extend .d-flex, .flex-col;

  gap: 2px;
}

.perk-name {
  @extend .input, .h3;
}

.perk-desc {
  @extend .input, .h3;

  resize: vertical;
}

.plus-minus-wrapper {
  @extend .d-flex;

  gap: #{sizeof(2)};
}

.plus-minus-btn {
  @extend .btn, .h3;

  flex-grow: 1;
}
</style>
