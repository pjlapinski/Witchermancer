<template lang="pug">
| characters list
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'

const props = defineProps<{ characters: Character[] }>()
</script>
