<template lang="pug">
section#notes-section.character-sheet-section
  h2.section-title {{ $t('characterSheet.section.notes') }}
  .px-5.my-3.d-flex.flex-col
    plus-btn(@click='$emit("add-note")')
    .note(
      v-for='(note, i) in character.notes'
    )
      .note-buttons
        button.btn-subtle.arrow-up(
          v-if='i !== 0',
          @click='emit("move-note", i, -1)'
        )
        button.btn-subtle.arrow-down(
          v-if='i !== character.notes.length - 1',
          @click='emit("move-note", i, 1)'
        )
        button.btn-subtle.delete.h5(
          @click='emit("delete-note", i)'
        )
      .note-content
        input.input-h3(
          v-model='note.title',
          type='text',
          @blur='$emit("save")',
          :placeholder='$t("character.notes.title")'
        )
        textarea.textarea-h3(
          v-model='note.text',
          @blur='$emit("save")',
          :placeholder='$t("character.notes.text")'
        )
</template>

<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import PlusBtn from '@/components/characterSheet/PlusBtn.vue'

const props = defineProps<{ character: Character }>()
const emit = defineEmits(['save', 'add-note', 'delete-note', 'move-note'])
</script>
