<template lang="pug">
input(
  type='number',
  :value='modelValue',
  @input='handleInput',
  @blur='$emit("blur")',
  ref='input'
)
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input = ref<HTMLInputElement | null>(null)
const props = defineProps<{ modelValue: number }>()
const emit = defineEmits(['update:modelValue', 'blur'])

const handleInput = (event: Event) => {
  const str = input?.value?.value ?? ''
  if (str.endsWith('.')) return
  const value = +str
  if (!isNaN(value) && value < 0) {
    if (input.value !== null) input.value.value = '0'
    emit('update:modelValue', 0)
  } else {
    emit('update:modelValue', value)
  }
}
</script>
