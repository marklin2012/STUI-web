import { InternalNamePath } from './interface'

const formItemNameBlackList = ['parentNode']

const defaultItemNamePrefixCls: string = 'form_item'

export function toArray<T>(candidate?: T | T[] | false): T[] {
  if (candidate === undefined || candidate === false) return []

  return Array.isArray(candidate) ? candidate : [candidate]
}

export function getFieldId(namePath: InternalNamePath, formName?: string): string | undefined {
  if (!namePath.length) return undefined

  const mergedId = namePath.join('_')

  if (formName) {
    return `${formName}_${mergedId}`
  }

  const isIllegalName = formItemNameBlackList.indexOf(mergedId) >= 0

  return isIllegalName ? `${defaultItemNamePrefixCls}_${mergedId}` : mergedId
}
