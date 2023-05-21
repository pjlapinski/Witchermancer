<template lang="pug">
.d-flex.flex-col
  button.plus-btn(@click='$emit("click")') +
div &nbsp;
</template>
<script setup lang="ts">
const emit = defineEmits(['click'])
</script>
<style scoped lang="scss">
.plus-btn {
  @extend .btn, .mx-5, .text-center, .h3;
}
</style>
