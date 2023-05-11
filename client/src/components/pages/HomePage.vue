<template lang="pug">
template(v-if='user.isAuthenticated')
  div(v-for='char in characters', v-if='characters.length > 0')
    | {{ char.name }}
  div(v-else) No characters!
template(v-else)
  div login!
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Character } from '@/domain/types/character'
import { getUserCharacters } from '@/domain/api'
import { useUserStore } from '@/domain/store/user'

let user = useUserStore()

let characters = reactive<Character[]>([])

if (user.isAuthenticated)
  getUserCharacters().then(chars => (characters = chars))
</script>
