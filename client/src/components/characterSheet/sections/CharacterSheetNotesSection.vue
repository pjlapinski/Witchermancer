<template lang="pug">
section#notes-section.character-sheet-section
  h2.section-title {{ $t('characterSheet.section.notes') }}
  .px-5.my-3.d-flex.flex-col
    resize-textarea.textarea-h3(
      v-model='character.notes',
      @blur.native='$emit("save")',
      :placeholder='$t("character.notes")'
    )
</template>

<script setup lang="ts">
import type { Character } from '@/domain/types/character'

const props = defineProps<{ character: Character }>()
const emit = defineEmits(['save'])
</script>
