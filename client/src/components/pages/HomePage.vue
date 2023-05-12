<template lang="pug">
main#home-page-content(v-if='user.isAuthenticated')
  button.btn-subtle {{ $t('home.createCharacter') }}
  characters-list(:characters='characters')
main#home-page-content(v-else)
  h1 {{ $t('home.greeting') }}
  p#website-description {{ $t('home.description') }}
  #split-line
  button#sign-in-btn(@click='handleSignInBtnClick()') {{ $t('home.signIn') }}
</template>

<script setup lang="ts">
import CharactersList from '@/components/home/CharactersList.vue'
import { reactive } from 'vue'
import { getUserCharacters } from '@/domain/api'
import { useUserStore } from '@/domain/store/user'
import type { Character } from '@/domain/types/character.d.ts'

let user = useUserStore()

let characters = reactive<Character[]>([])

if (user.isAuthenticated)
  getUserCharacters().then(chars => (characters = chars))

const handleSignInBtnClick = () => {
  window.location.pathname = '/api/login'
}
</script>

<style scoped lang="scss">
#home-page-content {
  @extend .d-flex, .flex-col, .text-center, .p-3, .mt-5;

  gap: 5vh;
}

#website-description {
  @extend .h3;
}

#split-line {
  border-top: 1px solid var(--color-5);
}

#sign-in-btn {
  @extend .btn-subtle, .mx-auto, .py-1, .px-3, .h3;

  width: fit-content;
  color: var(--color-5);
}
</style>
