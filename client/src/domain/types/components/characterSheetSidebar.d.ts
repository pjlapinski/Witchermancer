export type InputOption =
  | 'Number'
  | 'PositiveNumber'
  | 'Text'
  | 'TextArea'
  | 'Checkbox'

export type OpenedItem = {
  name: string
  description: string
  fields: {
    [key: string]: {
      displayName: string
      input: InputOption
      initialValue: string | number | boolean
    }
  }
}
