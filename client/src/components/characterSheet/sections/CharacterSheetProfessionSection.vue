<template lang="pug">
section#profession-section.character-sheet-section
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'

const props = defineProps<{ character: Character }>()
</script>
