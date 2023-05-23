<template lang="pug">
aside#character-sheet-sidebar(:class='{ "character-sheet-sidebar-hidden": !open }')
  #character-sheet-sidebar-top-buttons
    button.btn-subtle(@click='$emit("close")') X
    button.btn-subtle(
      v-if='item.deletable'
      @click='$emit("deleted")'
    ) {{ $t('characterSheet.sidebar.delete') }}
  #character-sheet-sidebar-content
    h2.fg-5 {{ item.name }}
    .split-line.my-3
    template(v-if='(item?.description?.length ?? 0) !== 0')
      p {{ item.description }}
      .split-line.my-3
    .character-sheet-sidebar-item(v-for='field in item.fields')
      h3.mb-3(v-if='field.displayName !== undefined') {{ field.displayName }}
      input.sidebar-input(
        v-if='field.input === "Number" && open',
        type='number',
        v-model='field.value',
        @blur='$emit("edited", item.fields)'
      )
      positive-input.sidebar-input(
        v-if='field.input === "PositiveNumber" && open',
        v-model='(field.value as number)',
        @blur='$emit("edited", item.fields)'
      )
      input.sidebar-input(
        v-if='field.input === "Text" && open',
        type='text'
        v-model='field.value'
        @blur='$emit("edited", item.fields)'
      )
      resize-textarea.textarea-h3(
        v-if='field.input === "TextArea" && open',
        v-model='field.value'
        @blur.native='$emit("edited", item.fields)'
      )
      input.sidebar-input(
        v-if='field.input === "Checkbox" && open',
        type='checkbox'
        v-model='field.value'
        @blur='$emit("edited", item.fields)'
      )
      select.sidebar-input(
        v-if='field.input === "Select" && field.selectOptions && open',
        v-model='field.value'
        @change='$emit("edited", item.fields)'
      )
        option(v-for='opt in field.selectOptions', :value="opt.value") {{ opt.text }}
</template>
<script setup lang="ts">
import type { OpenedItem } from '@/domain/types/components/characterSheetSidebar'
import PositiveInput from '@/components/utility/PositiveInput.vue'

const props = defineProps<{
  open: boolean
  item: OpenedItem
}>()
const emit = defineEmits(['close', 'edited', 'deleted'])
</script>
<style scoped lang="scss">
$transition-duration: 0.2s;

#character-sheet-sidebar {
  @extend .bg-3, .vh-100, .vw-100, .d-flex, .flex-col;

  position: fixed;
  top: 0;
  left: 0;

  transition: all ease-in-out $transition-duration;
}

#character-sheet-sidebar-content {
  @extend .pb-5, .px-3;

  overflow-y: scroll;
}

.character-sheet-sidebar-hidden {
  translate: 100vw;
}

.sidebar-input {
  @extend .input, .h3;

  align-self: stretch;
}

.character-sheet-sidebar-item {
  @extend .w-100, .mb-3, .d-flex, .flex-col;
}

#character-sheet-sidebar-top-buttons {
  @extend .d-flex, .my-5, .px-3;

  justify-content: space-between;
}

p {
  white-space: pre-line;
}
</style>
