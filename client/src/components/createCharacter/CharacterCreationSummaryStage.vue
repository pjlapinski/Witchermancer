<template lang="pug">
section.character-creation-stage-content
  p.h3 {{ $t('characterCreation.step6.summary') }}
  button.h3.btn.mt-5(@click='handleFinishClick', ref='finishBtn') {{ $t('characterCreation.step6.finish') }}
</template>
<script setup lang="ts">
import { ref } from 'vue'

const finishBtn = ref<HTMLButtonElement | null>(null)
const emit = defineEmits(['finish'])

const handleFinishClick = () => {
  if (finishBtn.value !== null) finishBtn.value.disabled = true
  emit('finish')
}
</script>
