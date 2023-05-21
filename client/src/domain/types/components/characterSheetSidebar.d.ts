export type SelectOption = {
  value: string
  text: string
}

export type InputOption =
  | 'Number'
  | 'PositiveNumber'
  | 'Text'
  | 'TextArea'
  | 'Checkbox'
  | 'Select'

export type OpenedItem = {
  name: string
  description: string
  deletable: boolean
  fields: {
    [key: string]: {
      displayName: string
      input: InputOption
      initialValue: string | number | boolean
      selectOptions?: SelectOption[]
    }
  }
}

export type OpenSidebarFn = (item: OpenedItem) => void
