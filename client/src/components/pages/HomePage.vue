<template lang="pug">
| {{ character }}
</template>

<script setup lang="ts">
import { ref } from 'vue'

let character = ref<string | undefined>(undefined)

const fetchData = () => {
  character.value = undefined
  fetch('api/hello')
    .then(r => r.text())
    .then(t => (character.value = t))
}

fetchData()
</script>
