<template lang="pug">
section#gear-section.character-sheet-section
  h2.section-title {{ $t('characterSheet.section.gear') }}
  .item-row.mt-5(@click='openEncumbranceSidebar')
    h3 {{ $t('character.carryWeight') }}
    h3 {{ round(getCarriedWeight(character)) }} / {{ getEncumbranceScore(character) }}
  .item-row(@click='moneyOpened = !moneyOpened')
    h3 {{ $t('character.money.name') }}
    h3 {{ $t('character.money.approx', {n: getApproxCrownsValue(character.money)}) }}
  template(v-if='moneyOpened')
    .split-line
    .pt-3
      .item-row.cursor-default
        h3 {{ $t('character.money.displayCurrency') }}
        select.input(v-model='displayCurrency')
          option(v-for='currency in DisplayCurrencies', :value='currency') {{ $t(`character.money.currency.${currency}`) }}
      template(v-if='displayCurrency === "default"')
        .item-row.cursor-default(v-for='(money, i) in character.money')
          .money-item
            button.btn-subtle.delete(@click='$emit("delete-currency", i)')
            positive-input.input(v-model='money.amount' @blur='$emit("edit")')
          select.input(v-model='money.currency', @change='$emit("edit")')
            option(v-for='currency in Currencies', :value='currency') {{ $t(`character.money.currency.${currency}`) }}
        plus-btn(@click='$emit("add-currency")')
      template(v-else)
        .item-row.cursor-default(v-for='money in character.money')
          h3.text-right.pr-1 {{ round(convertCurrency(money, displayCurrency)) }}
          h3 {{ $t(`character.money.currency.${money.currency}`) }}
    .split-line
  .item-row.mb-5.cursor-default
    h3 {{ $t('character.encumbranceValue') }}
    h3 {{ getCurrentEncumbranceValue(character) }}
  h2.mx-5.py-3 {{ $t('character.weapons') }}
  plus-btn(@click='$emit("add-weapon")')
  .item-row(
    v-for='(weapon, i) in character.weapons',
    @click='openWeaponSidebar(i)'
  )
    h3 {{ weapon.name }}
    h3 {{ formatDmgBonus(weapon) }}{{ formatDieRoll(getWeaponDamage(character, i), t) }}
  h2.mx-5.py-3 {{ $t('character.armor') }}
  .item-row(
    v-for='section in AllArmorSections',
    @click='openArmorSidebar(section)'
  )
    h3 {{ $t(`character.armorSection.${section}`) }}
    h3(v-if='(character.armor[section]?.name?.length ?? 0) === 0') {{ getStoppingPower(character, section) }} {{ $t('character.stoppingPower.abbr') }}
    h3(v-else) {{  character.armor[section]!.name  }} ({{ getStoppingPower(character, section) }} {{ $t('character.stoppingPower.abbr') }})
  h2.mx-5.py-3 {{ $t('character.gear') }}
  plus-btn(@click='$emit("add-gear")')
  .item-row(v-for='(gear, i) in character.gear', @click='openGearSidebar(i)')
    h3 {{ gear.name }}
    h3 {{ gear.amount }}
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Character } from '@/domain/types/character'
import type { OpenSidebarFn } from '@/domain/types/components/characterSheetSidebar'
import {
  getCarriedWeight,
  getEncumbranceScore,
  getStoppingPower,
  encumbranceMod,
  getModifier,
  damageMod,
  getWeaponDamage, 
  getCurrentEncumbranceValue,
} from '@/domain/utility/character'
import { round } from '@/domain/utility/math'
import { formatDieRoll } from '@/domain/utility/string'
import type { Concealment, Weapon, DisplayCurrency, Currency } from '@/domain/types/gear'
import { AllArmorSections, type ArmorSection } from '@/domain/types/armor'
import PlusBtn from '@/components/characterSheet/PlusBtn.vue'
import { useI18n } from 'vue-i18n'
import { armorMod } from '@/domain/utility/character'
import { getApproxCrownsValue, DisplayCurrencies, Currencies, convertCurrency } from "@/domain/types/money";
import PositiveInput from "@/components/utility/PositiveInput.vue";

const { t } = useI18n()

const props = defineProps<{
  character: Character
  openSidebarFn: OpenSidebarFn
}>()
const emit = defineEmits(['edit', 'add-gear', 'add-weapon', 'add-currency', 'delete-currency'])
const moneyOpened = ref(false)
const displayCurrency = ref<DisplayCurrency>('default')

const formatDmgBonus = (weapon: Weapon) => {
  if (weapon.accuracy === 0) return ''
  return `${weapon.accuracy > 0 ? '+' : ''}${weapon.accuracy} | `
}

const openEncumbranceSidebar = () =>
  props.openSidebarFn({
    name: t('character.carryWeight'),
    deletable: false,
    fields: [
      {
        displayName: t('character.bonusEncumbrance'),
        input: 'Number',
        value: getModifier(props.character, encumbranceMod),
      },
    ],
    editCallback(fields) {
      const mods = { ...props.character.modifiers }
      mods[encumbranceMod] = fields[0].value as number
      return {
        ...props.character,
        modifiers: mods,
      }
    },
  })

const openWeaponSidebar = (idx: number) => {
  const weapon = props.character.weapons[idx]
  props.openSidebarFn({
    name: weapon.name,
    description: weapon.notes,
    deletable: true,
    fields: [
      {
        displayName: t('character.generic.name'),
        input: 'Text',
        value: weapon.name,
      },
      {
        displayName: t('character.weapon.damageType'),
        input: 'Text',
        value: weapon.type,
      },
      {
        displayName: t('character.weapon.accuracy'),
        input: 'Number',
        value: weapon.accuracy,
      },
      {
        displayName: t('character.weapon.damage.diceAmount'),
        input: 'PositiveNumber',
        value: weapon.damage.diceAmount,
      },
      {
        displayName: t('character.weapon.damage.modifier'),
        input: 'Number',
        value: weapon.damage.modifier,
      },
      {
        displayName: t('character.bonusDamage'),
        input: 'Number',
        value: getModifier(props.character, damageMod),
      },
      {
        displayName: t('character.weapon.reliability'),
        input: 'PositiveNumber',
        value: weapon.reliability,
      },
      {
        displayName: t('character.generic.range'),
        input: 'Text',
        value: weapon.range,
      },
      {
        displayName: t('character.generic.effect'),
        input: 'Text',
        value: weapon.effect,
      },
      {
        displayName: t('character.weapon.concealment.name'),
        input: 'Select',
        value: weapon.concealment,
        selectOptions: [
          {
            text: t('character.weapon.concealment.tiny'),
            value: 'Tiny',
          },
          {
            text: t('character.weapon.concealment.small'),
            value: 'Small',
          },
          {
            text: t('character.weapon.concealment.large'),
            value: 'Large',
          },
          {
            text: t('character.weapon.concealment.cantHide'),
            value: 'CantHide',
          },
        ],
      },
      {
        displayName: t('character.generic.enhancements.available'),
        input: 'PositiveNumber',
        value: weapon.enhancements.available,
      },
      {
        displayName: t('character.generic.enhancements.inserted'),
        input: 'Text',
        value: weapon.enhancements.inserted,
      },
      {
        displayName: t('character.weight'),
        input: 'PositiveNumber',
        value: weapon.weight,
      },
      {
        displayName: t('character.notes.name'),
        input: 'TextArea',
        value: weapon.notes,
      },
    ],
    editCallback(fields) {
      const weapons = [...props.character.weapons]
      weapons[idx] = {
        name: fields[0].value as string,
        type: fields[1].value as string,
        accuracy: fields[2].value as number,
        damage: {
          diceAmount: fields[3].value as number,
          diceType: 6,
          modifier: fields[4].value as number,
        },
        reliability: fields[6].value as number,
        range: fields[7].value as string,
        effect: fields[8].value as string,
        concealment: fields[9].value as Concealment,
        enhancements: {
          available: fields[10].value as number,
          inserted: fields[11].value as string,
        },
        weight: fields[12].value as number,
        notes: fields[13].value as string,
      }
      const modifiers = { ...props.character.modifiers }
      modifiers[damageMod] = fields[5].value as number
      return { ...props.character, weapons, modifiers }
    },
    deleteCallback() {
      const weapons = [...props.character.weapons]
      weapons.splice(idx, 1)
      return { ...props.character, weapons }
    },
  })
}

const openArmorSidebar = (section: ArmorSection) => {
  const item = props.character.armor[section] ?? {
    name: '',
    effect: '',
    encumbranceValue: 0,
    enhancements: {
      available: 0,
      inserted: '',
    },
    notes: '',
    stoppingPower: 0,
    weight: 0,
  }
  props.openSidebarFn({
    name: t(`character.armorSection.${section}`),
    description: item.notes,
    deletable: true,
    fields: [
      {
        displayName: t('character.generic.name'),
        input: 'Text',
        value: item.name,
      },
      {
        displayName: t('character.stoppingPower.full'),
        input: 'PositiveNumber',
        value: item.stoppingPower,
      },
      {
        displayName: t('character.bonusArmor'),
        input: 'Number',
        value: getModifier(props.character, armorMod),
      },
      {
        displayName: t('character.generic.effect'),
        input: 'Text',
        value: item.effect,
      },
      {
        displayName: t('character.generic.enhancements.available'),
        input: 'PositiveNumber',
        value: item.enhancements.available,
      },
      {
        displayName: t('character.generic.enhancements.inserted'),
        input: 'Text',
        value: item.enhancements.inserted,
      },
      {
        displayName: t('character.encumbranceValue'),
        input: 'PositiveNumber',
        value: item.encumbranceValue,
      },
      {
        displayName: t('character.weight'),
        input: 'PositiveNumber',
        value: item.weight,
      },
      {
        displayName: t('character.notes.name'),
        input: 'TextArea',
        value: item.notes,
      },
    ],
    deleteCallback() {
      const armor = { ...props.character.armor }
      armor[section] = undefined
      return { ...props.character, armor }
    },
    editCallback(fields) {
      const armor = { ...props.character.armor }
      armor[section] = {
        name: fields[0].value as string,
        stoppingPower: fields[1].value as number,
        effect: fields[3].value as string,
        enhancements: {
          available: fields[4].value as number,
          inserted: fields[5].value as string,
        },
        encumbranceValue: fields[6].value as number,
        weight: fields[7].value as number,
        notes: fields[8].value as string,
      }
      const modifiers = { ...props.character.modifiers }
      modifiers[armorMod] = fields[2].value as number
      return { ...props.character, armor, modifiers }
    },
  })
}

const openGearSidebar = (idx: number) => {
  const item = props.character.gear[idx]
  props.openSidebarFn({
    name: item.name,
    description: item.notes,
    deletable: true,
    fields: [
      {
        displayName: t('character.generic.name'),
        input: 'Text',
        value: item.name,
      },
      {
        displayName: t('character.amount'),
        input: 'PositiveNumber',
        value: item.amount,
      },
      {
        displayName: t('character.weight'),
        input: 'PositiveNumber',
        value: item.weight,
      },
      {
        displayName: t('character.notes.name'),
        input: 'TextArea',
        value: item.notes,
      },
    ],
    deleteCallback() {
      const gear = [...props.character.gear]
      gear.splice(idx, 1)
      return { ...props.character, gear }
    },
    editCallback(fields) {
      const gear = [...props.character.gear]
      gear[idx] = {
        name: fields[0].value as string,
        amount: fields[1].value as number,
        weight: fields[2].value as number,
        notes: fields[3].value as string,
      }
      return { ...props.character, gear }
    },
  })
}
</script>

<style lang="scss">
.money-item {
  @extend .d-flex, .pr-1;

  & :nth-child(1) {
    max-width: #{sizeof(8)};
  }
}
</style>
