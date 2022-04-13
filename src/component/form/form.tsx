import React from 'react'
import { useMemo } from 'react'
import classNames from 'classnames'
import FieldForm, { List } from 'rc-field-form'
import { FormProps as RcFormProps } from 'rc-field-form/lib/Form'
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'
import { Options } from 'scroll-into-view-if-needed'
import { ColProps } from '../grids/col'
import { FormContext, FormContextProps } from './context'
import { FormLabelAlign } from './interface'
import useForm, { FormInstance } from './hooks/useForm'
import { SizeType } from '../_util/type'
import SizeContext, { SizeContextProvider } from '../_util/sizeContext'

export type RequiredMark = boolean | 'optional'
export type FormLayout = 'horizontal' | 'inline' | 'vertical'

export interface FormProps<Values = any> extends Omit<RcFormProps<Values>, 'form'> {
  prefixCls?: string
  colon?: boolean
  name?: string
  layout?: FormLayout
  labelAlign?: FormLabelAlign
  labelWrap?: boolean
  labelCol?: ColProps
  wrapperCol?: ColProps
  form?: FormInstance<Values>
  size?: SizeType
  scrollToFirstError?: Options | boolean
  requiredMark?: RequiredMark
}

const InternalForm: React.ForwardRefRenderFunction<FormInstance, FormProps> = (props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className = '',
    size = 'middle',
    form,
    colon,
    labelAlign,
    labelWrap,
    labelCol,
    wrapperCol,
    layout = 'horizontal',
    scrollToFirstError,
    requiredMark,
    onFinishFailed,
    name,
    ...restFormProps
  } = props

  const contextForm = { requiredMark: undefined, colon: undefined }

  const mergedRequiredMark = useMemo(() => {
    if (requiredMark !== undefined) {
      return requiredMark
    }

    if (contextForm && contextForm.requiredMark !== undefined) {
      return contextForm.requiredMark
    }

    return true
  }, [requiredMark, contextForm])

  const mergedColon = colon ?? contextForm?.colon

  const prefixCls = customizePrefixCls ?? 'st-form'

  const formClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${layout}`]: true,
      [`${prefixCls}-hide-required-mark`]: mergedRequiredMark === false,
      [`${prefixCls}-${size}`]: size,
    },
    className,
  )

  const [wrapForm] = useForm(form)
  const { __INTERNAL__ } = wrapForm
  __INTERNAL__.name = name

  const formContextValue = useMemo<FormContextProps>(
    () => ({
      name,
      labelAlign,
      labelCol,
      labelWrap,
      wrapperCol,
      vertical: layout === 'vertical',
      colon: mergedColon,
      requiredMark: mergedRequiredMark,
      itemRef: __INTERNAL__.itemRef,
    }),
    [name, labelAlign, labelCol, wrapperCol, layout, mergedColon, mergedRequiredMark],
  )

  React.useImperativeHandle(ref, () => wrapForm)

  const onInternalFinishFailed = (errorInfo: ValidateErrorEntity) => {
    onFinishFailed?.(errorInfo)

    let defaultScrollToFirstError: Options = { block: 'nearest' }

    if (scrollToFirstError && errorInfo.errorFields.length) {
      if (typeof scrollToFirstError === 'object') {
        defaultScrollToFirstError = scrollToFirstError
      }
      wrapForm.scrollToField(errorInfo.errorFields[0].name, defaultScrollToFirstError)
    }
  }

  return (
    <SizeContextProvider size={size}>
      <FormContext.Provider value={formContextValue}>
        <FieldForm
          id={name}
          {...restFormProps}
          name={name}
          onFinishFailed={onInternalFinishFailed}
          form={wrapForm}
          className={formClassName}
        />
      </FormContext.Provider>
    </SizeContextProvider>
  )
}

const Form = React.forwardRef<FormInstance, FormProps>(InternalForm) as <Values = any>(
  props: React.PropsWithChildren<FormProps<Values>> & { ref?: React.Ref<FormInstance<Values>> },
) => React.ReactElement

export { useForm, List }

export type { FormInstance }

export default Form
