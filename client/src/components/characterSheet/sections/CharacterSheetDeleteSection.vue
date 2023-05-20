<template lang="pug">
section#delete-section.character-sheet-section
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'

const props = defineProps<{ character: Character }>()
</script>
