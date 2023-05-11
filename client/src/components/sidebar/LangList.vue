<template lang="pug">
#sidebar-items
  .sidebar-item(@click='emit("close")')
    span#arrow-close &lsaquo;
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
  emit('close')
}
</script>
<style scoped lang="scss">
#arrow-close {
  @extend .h1, .ml-2, .pb-1;
}
</style>
