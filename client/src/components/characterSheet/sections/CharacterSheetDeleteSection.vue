<template lang="pug">
section#delete-section.character-sheet-section
  h2.py-3.mx-5 {{ $t('character.delete.warning') }}
  .d-flex.flex-col
    button.btn.mx-5.text-center.h3(@click='$emit("confirm-delete")') {{ $t('character.delete.confirm') }}
</template>
<script setup lang="ts">
const emit = defineEmits(['confirm-delete'])
</script>
