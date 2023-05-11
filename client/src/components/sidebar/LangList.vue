<template lang="pug">
#sidebar-items
  #lang-list-title
    span#lang-list-arrow-close(@click='emit("close")') &lsaquo;
    span {{ $t('langSelect') }}
  #items-separator
    .sidebar-item(
      v-for='locale in $i18n.availableLocales',
      @click='handleLocaleClick(locale)',
      :key='`lang.${locale}`'
    ) 
      | {{ $t(`lang.${locale}`) }}
</template>
<script setup lang="ts">
import { defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

const emit = defineEmits(['close'])
const handleLocaleClick = (lang: string) => {
  i18n.locale.value = lang
  localStorage.setItem('locale', lang)
  emit('close')
}
</script>
<style scoped lang="scss">
#lang-list-title {
  @extend .p-1, .d-flex, .pr-5;

  justify-content: space-between;
  align-items: center;
}

#lang-list-arrow-close {
  @extend .h1, .pb-1, .cursor-ptr, .no-select;

  padding-left: #{sizeof(2)};
  padding-right: #{sizeof(2)};
  border-radius: 8px;

  &:hover {
    @extend .bg-1;
  }
}
</style>
