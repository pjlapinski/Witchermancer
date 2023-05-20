<template lang="pug">
main#character-sheet(v-if='!loading')
  #section-selector
    select(v-model='openSection')
      option(v-for='(_, i) in 9', :value='i') {{ $t(`characterSheet.section.${i}`) }}
  character-sheet-personal-section(
    :class='{ "section-hidden": openSection !== 0 }',
    :character='character',
    @open-name='handleOpenName',
    @open-ip='handleOpenIP',
    @open-age='handleOpenAge',
    @open-gender='handleOpenGender',
    @open-reputation='handleOpenReputation',
    @open-social='handleOpenSocial',
    @save='saveCharacter'
  )
  character-sheet-derived-section(
    :class='{ "section-hidden": openSection !== 1 }',
    :character='character'
  )
  character-sheet-race-section(
    :class='{ "section-hidden": openSection !== 2 }',
    :character='character'
  )
  character-sheet-profession-section(
    :class='{ "section-hidden": openSection !== 3 }',
    :character='character'
  )
  character-sheet-skills-section(
    :class='{ "section-hidden": openSection !== 4 }',
    :character='character',
    @open-skill='handleOpenSkill',
    @open-stat='handleOpenStat',
    @open-defining='handleOpenDefiningSkill',
    @open-prof='handleOpenProfessionSkill'
  )
  character-sheet-magic-section(
    :class='{ "section-hidden": openSection !== 5 }',
    :character='character'
  )
  character-sheet-gear-section(
    :class='{ "section-hidden": openSection !== 6 }',
    :character='character'
  )
  character-sheet-notes-section(
    :class='{ "section-hidden": openSection !== 7 }',
    :character='character'
  )
  character-sheet-delete-section(
    :class='{ "section-hidden": openSection !== 8 }',
    :character='character'
  )
character-sheet-sidebar(
  :character='character',
  :open='sidebarOpen',
  :item='sidebarItem'
)
</template>

<script setup lang="ts">
import { getCharacter, updateCharacter } from '@/domain/api'
import CharacterSheetDeleteSection from '@/components/characterSheet/sections/CharacterSheetDeleteSection.vue'
import CharacterSheetDerivedSection from '@/components/characterSheet/sections/CharacterSheetDerivedSection.vue'
import CharacterSheetGearSection from '@/components/characterSheet/sections/CharacterSheetGearSection.vue'
import CharacterSheetPersonalSection from '@/components/characterSheet/sections/CharacterSheetPersonalSection.vue'
import CharacterSheetMagicSection from '@/components/characterSheet/sections/CharacterSheetMagicSection.vue'
import CharacterSheetNotesSection from '@/components/characterSheet/sections/CharacterSheetNotesSection.vue'
import CharacterSheetProfessionSection from '@/components/characterSheet/sections/CharacterSheetProfessionSection.vue'
import CharacterSheetRaceSection from '@/components/characterSheet/sections/CharacterSheetRaceSection.vue'
import CharacterSheetSkillsSection from '@/components/characterSheet/sections/CharacterSheetSkillsSection.vue'
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

const openSection = ref(0)

const handleOpenName = () => {}
const handleOpenIP = () => {}
const handleOpenAge = () => {}
const handleOpenGender = () => {}
const handleOpenReputation = () => {}
const handleOpenSocial = () => {}
const handleOpenStat = (stat: string) => {}
const handleOpenSkill = (stat: string, skill: string) => {}
const handleOpenDefiningSkill = () => {}
const handleOpenProfessionSkill = (idx: number) => {}

const fetchCharacter = async () => {
  Object.assign(character, await getCharacter(route.params.id as string))
  loading.value = false
}
const saveCharacter = () => {
  updateCharacter(route.params.id as string, character)
}

fetchCharacter()
</script>

<style lang="scss">
#character-sheet {
  display: flex;
  flex-wrap: wrap;
}

#section-selector {
  @extend .bg-4, .w-100, .p-3;

  & select {
    @extend .input, .h3, .w-100;

    background-color: var(--color-2);
  }
}

@media only screen and (max-width: 768px) {
  .section-hidden {
    display: none !important;
  }
}

.character-sheet-section {
  flex: 0 0 100%;
  width: 100%;
}

@media only screen and (min-width: 768px) {
  #section-selector {
    display: none;
  }

  .character-sheet-section {
    flex: 0 0 50%;
    width: 50%;
  }
}

.item-row {
  @extend .d-flex, .px-5, .cursor-ptr;

  justify-content: space-between;
  align-items: center;

  & * {
    max-width: 50%;
    overflow-wrap: break-word;
  }
}
</style>
