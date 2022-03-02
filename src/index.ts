import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

export { default as Alert } from './component/alert'
export { Tag, CheckableTag } from './component/tag'
export { default as Badge } from './component/badge'
export { default as Switch } from './component/switch'
export { default as Tooltip } from './component/tooltip'
export { default as Progress } from './component/progress/progress'
export { default as Icon } from './component/icon'
export { default as Avatar } from './component/avatar'
export { default as Image } from './component/image'

library.add(fas, far)
