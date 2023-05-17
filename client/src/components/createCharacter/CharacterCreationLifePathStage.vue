<template lang="pug">
section.character-creation-stage-content
  input.input-h3(v-model='character.name', :placeholder='$t("character.name")')
  h2.mt-3 {{ $t('character.age') }}
  positive-input.input-h3(type='number')(v-model='character.age')
  resize-textarea.textarea-h3(
    v-model='character.lifePath',
    :placeholder='$t("character.lifePath")'
  )
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import { defineProps } from 'vue'
import PositiveInput from '@/components/utility/PositiveInput.vue'

const props = defineProps<{ character: Character }>()
</script>
