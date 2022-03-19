import Input from './input'
import Group from './group'
import Search from './search'
import TextArea from './textArea'
import Password from './password'

export type { InputProps } from './input'
export type { GroupProps } from './group'
export type { SearchProps } from './search'
export type { TextAreaProps } from './textArea'
export type { PasswordProps } from './password'

Input.Group = Group
Input.Search = Search
Input.TextArea = TextArea
Input.Password = Password

export default Input
