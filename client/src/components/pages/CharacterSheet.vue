<template lang="pug">
main#character-sheet(v-if='!loading')
  #section-selector
    select(v-model='openSection')
      option(v-for='(_, i) in 9', :value='i') {{ $t(`characterSheet.section.${i}`) }}
  character-sheet-personal-section(
    :class='{ "section-hidden": openSection !== 0 }',
    :character='character',
    :open-sidebar-fn='openSidebar',
    @save='saveCharacter'
  )
  character-sheet-derived-section(
    :class='{ "section-hidden": openSection !== 1 }',
    :character='character',
    :open-sidebar-fn='openSidebar'
  )
  character-sheet-race-section(
    :class='{ "section-hidden": openSection !== 2 }',
    :character='character',
    :open-sidebar-fn='openSidebar',
    @add-perk='handleAddRacialPerk'
  )
  character-sheet-profession-section(
    :class='{ "section-hidden": openSection !== 3 }',
    :character='character',
    :open-sidebar-fn='openSidebar',
    @add-ability='handleAddProfessionAbility'
  )
  character-sheet-skills-section(
    :class='{ "section-hidden": openSection !== 4 }',
    :character='character',
    :open-sidebar-fn='openSidebar'
  )
  character-sheet-magic-section(
    :class='{ "section-hidden": openSection !== 5 }',
    :character='character',
    :open-sidebar-fn='openSidebar',
    @add-hex='handleAddHex',
    @add-ritual='handleAddRitual',
    @add-spell='handleAddSpell'
  )
  character-sheet-gear-section(
    :class='{ "section-hidden": openSection !== 6 }',
    :character='character',
    :open-sidebar-fn='openSidebar',
    @add-gear='handleAddGear',
    @add-weapon='handleAddWeapon'
  )
  character-sheet-notes-section(
    :class='{ "section-hidden": openSection !== 7 }',
    :character='character',
    @save='saveCharacter'
  )
  character-sheet-delete-section(
    :class='{ "section-hidden": openSection !== 8 }',
    @confirm-delete='confirmDeleteCharacter'
  )
character-sheet-sidebar(
  :open='sidebarOpen',
  :item='sidebarItem',
  @close='sidebarOpen = false',
  @edited='handleSidebarEdit',
  @deleted='handleSidebarDelete'
)
</template>

<script setup lang="ts">
import { getCharacter, updateCharacter, deleteCharacter } from '@/domain/api'
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
import type {
  OpenedItem,
  SidebarFields,
} from '@/domain/types/components/characterSheetSidebar'
import { createDefaultCharacter } from '@/domain/utility/character'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const reloads = ref(0) // increment to force a reload
const loading = ref(true)
const character = ref<Character>(createDefaultCharacter())

const sidebarOpen = ref(false)
const sidebarItem = ref<OpenedItem>({
  name: '',
  description: '',
  deletable: false,
  fields: [],
})

const openSection = ref(0)

const openSidebar = (item: OpenedItem) => {
  sidebarItem.value = item
  sidebarOpen.value = true
}
const handleSidebarEdit = (fields: SidebarFields) => {
  if (sidebarItem.value.editCallback) {
    character.value = sidebarItem.value.editCallback(fields)
    ++reloads.value
  }
  saveCharacter()
}
const handleSidebarDelete = () => {
  if (sidebarItem.value.deleteCallback) {
    character.value = sidebarItem.value.deleteCallback()
    ++reloads.value
  }
  saveCharacter()
  sidebarOpen.value = false
}

const handleAddRacialPerk = () => {
  const newChar = character.value
  newChar.race.perks.push({
    name: t('character.placeholders.racialPerk'),
    description: '',
  })
  character.value = newChar
  saveCharacter()
}
const handleAddProfessionAbility = () => {
  const newChar = character.value
  newChar.profession.abilities.push({
    name: t('character.placeholders.professionAbility'),
    description: '',
    level: 0,
    statistic: 'Intelligence',
  })
  character.value = newChar
  saveCharacter()
}
const handleAddSpell = () => {
  const newChar = character.value
  newChar.spells.push({
    name: t('character.placeholders.spell'),
    cost: '',
    effect: '',
    range: '',
  })
  character.value = newChar
  saveCharacter()
}
const handleAddHex = () => {
  const newChar = character.value
  newChar.hexes.push({
    name: t('character.placeholders.hex'),
    cost: '',
    effect: '',
  })
  character.value = newChar
  saveCharacter()
}
const handleAddRitual = () => {
  const newChar = character.value
  newChar.rituals.push({
    name: t('character.placeholders.ritual'),
    components: '',
    cost: '',
    difficultyClass: '0',
    effect: '',
    time: '',
  })
  character.value = newChar
  saveCharacter()
}
const handleAddGear = () => {
  const newChar = character.value
  newChar.gear.push({
    name: t('character.placeholders.gear'),
    notes: '',
    weight: 0,
  })
  character.value = newChar
  saveCharacter()
}
const handleAddWeapon = () => {
  const newChar = character.value
  newChar.weapons.push({
    name: t('character.placeholders.weapon'),
    accuracy: 0,
    concealment: 'Small',
    damage: {
      diceAmount: 1,
      diceType: 6,
      modifier: 0,
    },
    effect: '',
    enhancements: {
      available: 0,
      inserted: [],
    },
    handsRequired: 1,
    range: '',
    reliability: 1,
    type: [],
    weight: 0,
  })
  character.value = newChar
  saveCharacter()
}

const fetchCharacter = async () => {
  // Object.assign(character, await getCharacter(route.params.id as string))
  character.value = (await getCharacter(route.params.id as string)) as Character
  loading.value = false
}
const saveCharacter = () => {
  updateCharacter(route.params.id as string, character.value)
}
const confirmDeleteCharacter = async () => {
  await deleteCharacter(route.params.id as string)
  router.push({ name: 'Home' })
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
    border: 1px solid var(--color-2);
    padding: #{sizeof(5)};
  }
}

.item-row {
  @extend .d-flex, .px-5, .py-1, .cursor-ptr;

  justify-content: space-between;
  align-items: center;

  & * {
    flex-grow: 1;
    overflow-wrap: break-word;
  }

  // one child
  & :nth-child(1):nth-last-child(1) {
    width: 100%;
  }

  // two children
  & :nth-child(1):nth-last-child(2),
  & :nth-child(2):nth-last-child(1) {
    width: 50%;
  }

  & :nth-child(2):nth-last-child(1) {
    text-align: right;
  }
}

h3,
h2 {
  font-weight: normal;
}
</style>
