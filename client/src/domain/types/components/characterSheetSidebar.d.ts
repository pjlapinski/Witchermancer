import type { Character } from '@/domain/types/character'

export type SelectOption = {
  value: string
  text: string
}

export type SidebarFields = {
  displayName?: string
  input: InputOption
  value: string | number | boolean
  selectOptions?: SelectOption[]
}[]

export type InputOption =
  | 'Number'
  | 'PositiveNumber'
  | 'Text'
  | 'TextArea'
  | 'Checkbox'
  | 'Select'

export type SidebarCallback = (fields: SidebarFields) => Character

export type OpenedItem = {
  name: string
  description?: string
  deletable: boolean
  fields: SidebarFields
  editCallback?: SidebarCallback
  deleteCallback?: () => Character
}

export type OpenSidebarFn = (item: OpenedItem) => void
