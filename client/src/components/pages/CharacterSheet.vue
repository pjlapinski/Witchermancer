<template lang="pug">
main#character-sheet(v-if='!loading')
  #section-selector
    select(v-model='openSection')
      option(v-for='section in sectionNames', :value='section') {{ $t(`characterSheet.section.${section}`) }}
  character-sheet-personal-section(
    :class='{ "section-hidden": openSection !== "personal" }',
    :character='character',
    :open-sidebar-fn='openSidebar',
    @save='saveCharacter'
  )
  character-sheet-derived-section(
    :class='{ "section-hidden": openSection !== "derived" }',
    :character='character',
    :open-sidebar-fn='openSidebar'
  )
  character-sheet-race-section(
    :class='{ "section-hidden": openSection !== "race" }',
    :character='character',
    :open-sidebar-fn='openSidebar',
    @add-perk='handleAddRacialPerk'
  )
  character-sheet-profession-section(
    :class='{ "section-hidden": openSection !== "profession" }',
    :character='character',
    :open-sidebar-fn='openSidebar',
    @add-ability='handleAddProfessionAbility'
  )
  character-sheet-skills-section(
    :class='{ "section-hidden": openSection !== "stats" }',
    :character='character',
    :open-sidebar-fn='openSidebar'
  )
  character-sheet-magic-section(
    :class='{ "section-hidden": openSection !== "magic" }',
    :character='character',
    :open-sidebar-fn='openSidebar',
    @add-hex='handleAddHex',
    @add-ritual='handleAddRitual',
    @add-spell='handleAddSpell'
  )
  character-sheet-gear-section(
    :class='{ "section-hidden": openSection !== "gear" }',
    :character='character',
    :open-sidebar-fn='openSidebar',
    @add-gear='handleAddGear',
    @add-weapon='handleAddWeapon'
  )
  character-sheet-notes-section(
    :class='{ "section-hidden": openSection !== "notes" }',
    :character='character',
    @save='saveCharacter'
  )
  character-sheet-delete-section(
    :class='{ "section-hidden": openSection !== "delete" }',
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

const sectionNames = [
  'personal',
  'derived',
  'race',
  'profession',
  'stats',
  'magic',
  'gear',
  'notes',
  'delete',
] as const

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

const openSection = ref<(typeof sectionNames)[number]>('personal')

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
  newChar.race.perks.unshift({
    name: t('character.placeholders.racialPerk'),
    description: '',
  })
  character.value = newChar
  saveCharacter()
}
const handleAddProfessionAbility = () => {
  const newChar = character.value
  newChar.profession.abilities.unshift({
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
  newChar.spells.unshift({
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
  newChar.hexes.unshift({
    name: t('character.placeholders.hex'),
    cost: '',
    effect: '',
  })
  character.value = newChar
  saveCharacter()
}
const handleAddRitual = () => {
  const newChar = character.value
  newChar.rituals.unshift({
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
  newChar.gear.unshift({
    name: t('character.placeholders.gear'),
    notes: '',
    weight: 0,
    amount: 1,
  })
  character.value = newChar
  saveCharacter()
}
const handleAddWeapon = () => {
  const newChar = character.value
  newChar.weapons.unshift({
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
      inserted: '',
    },
    range: '',
    reliability: 1,
    type: '',
    weight: 0,
    notes: '',
  })
  character.value = newChar
  saveCharacter()
}

const fetchCharacter = async () => {
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

.section-title {
  @extend .text-center, .fg-5;
}

@media only screen and (max-width: 768px) {
  .section-hidden {
    display: none !important;
  }

  .character-sheet-section {
    flex: 0 0 100%;
    width: 100%;
  }

  .section-title {
    display: none;
  }
}

@media only screen and (min-width: 768px) {
  #character-sheet {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 1rem 3rem;
    gap: 5px;
  }

  #section-selector {
    display: none;
  }

  .character-sheet-section {
    border: 2px solid var(--color-2);
    padding: #{sizeof(5)};

    max-height: 400px;
    overflow-y: auto;
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
