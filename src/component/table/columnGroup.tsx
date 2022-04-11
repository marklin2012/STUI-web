import React from 'react'
import { ColumnType } from './interface'
import { ColumnProps } from './column'

export interface ColumnGroupProps<RecordType> extends Omit<ColumnType<RecordType>, 'children'> {
  children:
    | React.ReactElement<ColumnProps<RecordType>>
    | React.ReactElement<ColumnProps<RecordType>>[]
}

function ColumnGroup<RecordType>(_: ColumnGroupProps<RecordType>) {
  return null
}

export default ColumnGroup
