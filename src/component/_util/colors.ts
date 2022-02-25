import { ElementOf, tuple } from './type'

export const PresetStatusColorTypes = tuple('success', 'processing', 'error', 'default', 'warning')

export const PresetColorTypes = tuple(
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'gold',
  'lime',
)

export type PresetColorType = ElementOf<typeof PresetColorTypes>
export type PresetStatusColorType = ElementOf<typeof PresetStatusColorTypes>
