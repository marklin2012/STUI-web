import React from 'react'
import classNames from 'classnames'
import Col, { ColProps } from '../grids/col'
import { FormLabelAlign } from './interface'
import { FormContext, FormContextProps } from './context'
import { RequiredMark } from './Form'
import Tooltip, { TooltipProps } from '../tooltip'
import Icon from '../icon'

const typeTemplate = '${label}不是一个有效的${type}'

export const defaultFormLocale = {
  optional: '（可选）',
  defaultValidateMessages: {
    default: '字段验证错误${label}',
    required: '请输入${label}',
    enum: '${label}必须是其中一个[${enum}]',
    whitespace: '${label}不能为空字符',
    date: {
      format: '${label}日期格式无效',
      parse: '${label}不能转换为日期',
      invalid: '${label}是一个无效日期',
    },
    types: {
      string: typeTemplate,
      method: typeTemplate,
      array: typeTemplate,
      object: typeTemplate,
      number: typeTemplate,
      date: typeTemplate,
      boolean: typeTemplate,
      integer: typeTemplate,
      float: typeTemplate,
      regexp: typeTemplate,
      email: typeTemplate,
      url: typeTemplate,
      hex: typeTemplate,
    },
    string: {
      len: '${label}须为${len}个字符',
      min: '${label}最少${min}个字符',
      max: '${label}最多${max}个字符',
      range: '${label}须在${min}-${max}字符之间',
    },
    number: {
      len: '${label}必须等于${len}',
      min: '${label}最小值为${min}',
      max: '${label}最大值为${max}',
      range: '${label}须在${min}-${max}之间',
    },
    array: {
      len: '须为${len}个${label}',
      min: '最少${min}个${label}',
      max: '最多${max}个${label}',
      range: '${label}数量须在${min}-${max}之间',
    },
    pattern: {
      mismatch: '${label}与模式不匹配${pattern}',
    },
  },
}

export type WrapperTooltipProps = TooltipProps & {
  icon?: React.ReactElement
}

export type LabelTooltipType = WrapperTooltipProps | React.ReactNode

function toTooltipProps(tooltip: LabelTooltipType): WrapperTooltipProps | null {
  if (!tooltip) {
    return null
  }

  if (typeof tooltip === 'object' && !React.isValidElement(tooltip)) {
    return tooltip as WrapperTooltipProps
  }

  return {
    title: tooltip,
  }
}

export interface FormItemLabelProps {
  colon?: boolean
  htmlFor?: string
  label?: React.ReactNode
  labelAlign?: FormLabelAlign
  labelCol?: ColProps
  requiredMark?: RequiredMark
  tooltip?: LabelTooltipType
}

const FormItemLabel: React.FC<FormItemLabelProps & { required?: boolean; prefixCls: string }> = ({
  prefixCls,
  label,
  htmlFor,
  labelCol,
  labelAlign,
  colon,
  required,
  requiredMark,
  tooltip,
}) => {
  if (!label) return null

  return (
    <FormContext.Consumer key="label">
      {({
        vertical,
        labelAlign: contextLabelAlign,
        labelCol: contextLabelCol,
        labelWrap,
        colon: contextColon,
      }: FormContextProps) => {
        const mergedLabelCol: ColProps = labelCol || contextLabelCol || {}

        const mergedLabelAlign: FormLabelAlign | undefined = labelAlign || contextLabelAlign

        const labelClsBasic = `${prefixCls}-item-label`
        const labelColClassName = classNames(
          labelClsBasic,
          mergedLabelAlign === 'left' && `${labelClsBasic}-left`,
          mergedLabelCol.className,
          {
            [`${labelClsBasic}-wrap`]: !!labelWrap,
          },
        )

        let labelChildren = label
        // Keep label is original where there should have no colon
        const computedColon = colon === true || (contextColon !== false && colon !== false)
        const haveColon = computedColon && !vertical
        // Remove duplicated user input colon
        if (haveColon && typeof label === 'string' && (label as string).trim() !== '') {
          labelChildren = (label as string).replace(/[:|：]\s*$/, '')
        }

        // Tooltip
        const tooltipProps = toTooltipProps(tooltip)
        if (tooltipProps) {
          const { icon = <Icon icon={'question-circle'} />, ...restTooltipProps } = tooltipProps
          const tooltipNode = (
            <Tooltip {...restTooltipProps}>
              {React.cloneElement(icon, { className: `${prefixCls}-item-tooltip`, title: '' })}
            </Tooltip>
          )

          labelChildren = (
            <>
              {labelChildren}
              {tooltipNode}
            </>
          )
        }

        // Add required mark if optional
        if (requiredMark === 'optional' && !required) {
          labelChildren = (
            <>
              {labelChildren}
              <span className={`${prefixCls}-item-optional`} title="">
                {defaultFormLocale.optional}
              </span>
            </>
          )
        }

        const labelClassName = classNames({
          [`${prefixCls}-item-required`]: required,
          [`${prefixCls}-item-required-mark-optional`]: requiredMark === 'optional',
          [`${prefixCls}-item-no-colon`]: !computedColon,
        })

        return (
          <Col {...mergedLabelCol} className={labelColClassName}>
            <label
              htmlFor={htmlFor}
              className={labelClassName}
              title={typeof label === 'string' ? label : ''}
            >
              {labelChildren}
            </label>
          </Col>
        )
      }}
    </FormContext.Consumer>
  )
}

export default FormItemLabel
