<template lang="pug">
section#life-section.character-sheet-section
  .item-row.my-3(@click='')
    h2.fg-5 {{ character.name }}
  .split-line.mb-3
  .item-row(@click='')
    h3 {{ $t('character.age') }}
    h3 {{ character.age }}
  .item-row(@click='')
    h3 {{ $t('character.gender') }}
    h3 {{ character.gender }}
  .item-row(@click='')
    h3 {{ $t('character.reputation') }}
    h3 {{ character.reputation }}
  .item-row(@click='')
    h3 {{ $t('character.socialStanding.name') }}
    h3 {{ $t(`character.socialStanding.${character.socialStanding.toLowerCase()}`) }}
  .item-row(@click='')
    h3 {{ $t('character.improvementPoints') }}
    h3 {{ character.improvementPoints }}
  h2.px-5.my-3 {{ $t('character.lifePath') }}
  .px-5.d-flex.flex-col
    resize-textarea.textarea-h3(
      v-model='character.lifePath',
      @blur.native='$emit("save")',
      :placeholder='$t("character.lifePath")'
    )
</template>
<script setup lang="ts">
import type { Character } from '@/domain/types/character'
import type { OpenSidebarFn } from '@/domain/types/components/characterSheetSidebar'

const props = defineProps<{
  character: Character
  openSidebarFn: OpenSidebarFn
}>()
const emit = defineEmits(['save'])
</script>
