<template lang="pug">
section#character-list
  router-link.character-link(
    v-for='char in characters',
    :to='{ name: "CharacterSheet", params: { id: char.idString } }'
  ) {{ char.name }}
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'

const props = defineProps<{ characters: Character[] }>()
</script>
<style scoped lang="scss">
#character-list {
  @extend .d-flex, .flex-col, .w-100;

  align-self: center;
}

@media only screen and (min-width: 768px) {
  #character-list {
    width: 80%;
  }
}

.character-link {
  @extend .p-2, .h3, .no-decor;

  overflow-wrap: break-word;
}
</style>
