import Upload from './upload'
import Dragger from './upload-dragger'

export type { UploadProps, UploadListProps, UploadChangeParam, RcFile } from './interface'
export type { DraggerProps } from './upload-dragger'

Upload.Dragger = Dragger

export default Upload
