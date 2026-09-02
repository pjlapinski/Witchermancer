<template lang="pug">
.item-row(@click='open = !open')
  slot(name='button')
template(v-if='open')
  .bg-1-darken
    .pt-3
      slot(name='opened')
</template>

<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>
