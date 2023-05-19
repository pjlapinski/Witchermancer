<template lang="pug">
main#home-page-content(v-if='user.isAuthenticated')
  router-link.no-decor.btn-subtle.fg-5(:to='{ name: "CreateCharacter" }') {{ $t('home.createCharacter') }}
  .split-line
  characters-list(:characters='characters')
main#home-page-content(v-else)
  h1 {{ $t('home.greeting') }}
  p#website-description {{ $t('home.description') }}
  .split-line
  button#sign-in-btn(@click='handleSignInBtnClick()') {{ $t('home.signIn') }}
</template>

<script setup lang="ts">
import CharactersList from '@/components/home/CharactersList.vue'
import { ref } from 'vue'
import { getUserCharacters } from '@/domain/api'
import { useUserStore } from '@/domain/store/user'
import type { Character } from '@/domain/types/character.d.ts'

const user = useUserStore()

let characters = ref<Character[]>([])

if (user.isAuthenticated)
  getUserCharacters().then(chars => (characters.value = chars))

const handleSignInBtnClick = () => {
  window.location.pathname = '/api/login'
}
</script>

<style lang="scss">
#home-page-content {
  @extend .d-flex, .flex-col, .text-center, .p-3, .mt-5;

  gap: 2vh;
}

#website-description {
  @extend .h3;
}

.split-line {
  border-top: 1px solid var(--color-5);
}

#sign-in-btn {
  @extend .btn-subtle, .mx-auto, .py-1, .px-3, .h3, .fg-5;

  width: fit-content;
}
</style>
