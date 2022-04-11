import { ColumnType } from './interface'

export interface ColumnProps<RecordType> extends ColumnType<RecordType> {
  children?: null
}

function Column<RecordType>(_: ColumnProps<RecordType>) {
  return null
}

export default Column
