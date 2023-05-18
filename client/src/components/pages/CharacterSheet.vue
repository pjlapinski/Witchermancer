<template lang="pug">
| Character sheet
</template>
<script setup lang="ts">
import { getCharacter } from '@/domain/api'
import { useRoute } from 'vue-router'

const route = useRoute()

const fetchCharacter = async () => {
  const id = route.params.id
  const character = await getCharacter(id as string)
  console.log(character)
}

fetchCharacter()
</script>
