<template lang="pug">
//- reputation, social standing
section#life-section.character-sheet-section
  .item-row.my-3(@click='$emit("open-name")')
    h2.fg-5 {{ character.name }}
  .split-line.mb-3
  .item-row(@click='$emit("open-age")')
    h3 {{ $t('character.age') }}
    h3 {{ character.age }}
  .item-row(@click='$emit("open-gender")')
    h3 {{ $t('character.gender') }}
    h3 {{ character.gender }}
  .item-row(@click='$emit("open-reputation")')
    h3 {{ $t('character.reputation') }}
    h3 {{ character.reputation }}
  .item-row(@click='$emit("open-social")')
    h3 {{ $t('character.socialStanding.name') }}
    h3 {{ $t(`character.socialStanding.${character.socialStanding.toLowerCase()}`) }}
  .item-row(@click='$emit("open-ip")')
    h3 {{ $t('character.improvementPoints') }}
    h3 {{ character.improvementPoints }}
  h2.px-5.my-3 {{ $t('character.lifePath') }}
  .px-5
    resize-textarea.w-100.textarea-h3(
      @blur.native='$emit("save")',
      v-model='character.lifePath'
    )
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'

const props = defineProps<{ character: Character }>()
const emit = defineEmits([
  'open-name',
  'open-social',
  'open-reputation',
  'open-age',
  'open-gender',
  'open-ip',
  'save',
])
</script>
<style scoped lang="scss">
h3,
h2 {
  font-weight: normal;
}
</style>
