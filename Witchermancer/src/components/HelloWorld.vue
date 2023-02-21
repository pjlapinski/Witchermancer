<script setup lang="ts">
import { ref } from 'vue'

let msg = ref('')

const fetchData = () => {
  msg.value = ''
  fetch('api/hello')
    .then(r => r.text())
    .then(txt => (msg.value = txt))
}

fetchData()
</script>

<template lang="pug">
.post {{ msg }}
</template>
