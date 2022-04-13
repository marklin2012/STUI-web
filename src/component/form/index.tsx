import { Rule, RuleObject, RuleRender } from 'rc-field-form/lib/interface'
import InternalForm, { useForm, FormInstance, FormProps } from './form'
import Item, { FormItemProps } from './formItem'
import ErrorList, { FormErrorListProps } from './errorList'
import List, { FormListProps } from './formList'
import { FormProvider } from './context'

type InternalFormType = typeof InternalForm

interface FormInterface extends InternalFormType {
  useForm: typeof useForm
  Item: typeof Item
  List: typeof List
  ErrorList: typeof ErrorList
  Provider: typeof FormProvider
}

const Form = InternalForm as FormInterface

Form.Item = Item
Form.List = List
Form.ErrorList = ErrorList
Form.useForm = useForm
Form.Provider = FormProvider

export type {
  FormInstance,
  FormProps,
  FormItemProps,
  FormErrorListProps,
  Rule,
  RuleObject,
  RuleRender,
  FormListProps,
}

export default Form
