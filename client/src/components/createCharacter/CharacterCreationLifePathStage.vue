<template lang="pug">
section.character-creation-stage-content
  resize-textarea.textarea-h3(v-model='character.lifePath')
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import { defineProps } from 'vue'

const props = defineProps<{ character: Character }>()
</script>
