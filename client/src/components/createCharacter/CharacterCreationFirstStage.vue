<template lang="pug">
| st.1
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import { defineProps } from 'vue'

const props = defineProps<{ character: Character }>()
</script>
<style scoped lang="scss"></style>
