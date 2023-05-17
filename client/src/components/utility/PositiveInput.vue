<template lang="pug">
input(type='number', :value='modelValue', @input='handleInput', ref='input')
</template>
<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'

const input = ref<HTMLInputElement | null>(null)
const props = defineProps<{ modelValue: number }>()
const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  const value = +(input?.value?.value ?? '')
  if (!isNaN(value) && value < 0) {
    if (input.value !== null) input.value.value = '0'
    emit('update:modelValue', 0)
  } else {
    emit('update:modelValue', value)
  }
}
</script>
