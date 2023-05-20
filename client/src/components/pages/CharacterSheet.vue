<template lang="pug">
main#character-sheet(v-if='!loading')
  character-sheet-skills-section(
    :character='character',
    @open-skill='handleOpenSkill',
    @open-stat='handleOpenStat'
  )
character-sheet-sidebar(
  :character='character',
  :open='sidebarOpen',
  :item='sidebarItem'
)
</template>
<script setup lang="ts">
import { getCharacter } from '@/domain/api'
import CharacterSheetSkillsSection from '@/components/characterSheet/CharacterSheetSkillsSection.vue'
import CharacterSheetSidebar from '../characterSheet/CharacterSheetSidebar.vue'
import type { Character } from '@/domain/types/character'
import type { OpenedItem } from '@/domain/types/components/characterSheetSidebar'
import { createDefaultCharacter } from '@/domain/utility/character'
import { useRoute } from 'vue-router'
import { reactive, ref } from 'vue'

const route = useRoute()

const loading = ref(true)
const character = reactive<Character>(createDefaultCharacter())

const sidebarOpen = ref(false)
const sidebarItem = reactive<OpenedItem>({
  name: '',
  description: '',
  fields: {},
})

const handleOpenStat = (stat: string) => {
  console.log(stat)
}
const handleOpenSkill = (stat: string, skill: string) => {
  console.log(stat, skill)
}

const fetchCharacter = async () => {
  const id = route.params.id
  Object.assign(character, await getCharacter(id as string))
  loading.value = false
}

fetchCharacter()
</script>
<style lang="scss">
#character-sheet {
  display: flex;
  flex-wrap: wrap;
}

.character-sheet-section {
  flex: 0 0 100%;
}

@media only screen and (min-width: 768px) {
  .character-sheet-section {
    flex: 0 0 50%;
  }
}
</style>
