import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

export { default as Alert } from './component/alert'

export type { AvatarProps } from './component/avatar'
export { default as Avatar } from './component/avatar'

export type { ButtonProps } from './component/button'
export { default as Button } from './component/button'

export type { BadgeProps } from './component/badge'
export { default as Badge } from './component/badge'

export type { BreadcrumbProps, BreadcrumbItemProps } from './component/breadcrumb'
export { default as Breadcrumb } from './component/breadcrumb'

export type { CardProps } from './component/card'
export { default as Card } from './component/card'

export type { CascaderProps } from './component/cascader'
export { default as Cascader } from './component/cascader'

export type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxOptionType,
  CheckboxValueType,
  CheckboxChangeEvent,
} from './component/checkbox'
export { default as Checkbox } from './component/checkbox'

export type { CollapseProps, CollapsePanelProps } from './component/collapse'
export { default as Collapse } from './component/collapse'

export type { DatePickerProps } from './component/datePicker'
export { default as DatePicker } from './component/datePicker'

export type { DrawerProps } from './component/drawer'
export { default as Drawer } from './component/drawer'

export type { DropdownProps, DropdownButtonType, DropdownButtonProps } from './component/dropdown'
export { default as Dropdown } from './component/dropdown'

export { default as Icon } from './component/icon'

export type { ImageProps } from './component/image'
export { default as Image } from './component/image'

export type { InputProps } from './component/input'
export { default as Input } from './component/input'

export type { MenuProps, SubMenuProps, MenuItemProps } from './component/menu'
export { default as Menu } from './component/menu'

export type { ModalProps, ModalFuncProps } from './component/modal'
export { default as Modal } from './component/modal'

export { default as Notification } from './component/notification'

export type { PaginationProps } from './component/pagination'
export { default as Pagination } from './component/pagination'

export type { ProgressProps } from './component/progress'
export { default as Progress } from './component/progress'

export type { RadioProps, RadioChangeEvent, RadioGroupProps } from './component/radio'
export { default as Radio } from './component/radio'

export type { RateProps } from './component/rate'
export { default as Rate } from './component/rate'

export type { SelectProps } from './component/select'
export { default as Select } from './component/select'

export type { SliderSingleProps, SliderRangeProps } from './component/slider'
export { default as Slider } from './component/slider'

export type { stepProps, StepsProps, StepsStatus } from './component/steps'
export { default as Steps } from './component/steps'

export type { SwitchProps } from './component/switch'
export { default as Switch } from './component/switch'

export type { TabsProps, TabPaneProps } from './component/tabs'
export { default as Tabs } from './component/tabs'

export type { TagProps, TagCompoundedProps } from './component/tag'
export { default as Tag } from './component/tag'

export type { TimePickerProps, TimeRangePickerProps } from './component/timePicker'
export { default as TimePicker } from './component/timePicker'

export type { TooltipProps } from './component/tooltip'
export { default as Tooltip } from './component/tooltip'

library.add(fas, far)
