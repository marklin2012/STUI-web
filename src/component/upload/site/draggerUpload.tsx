import React from 'react'
import { Upload, Icon } from '../../..'
import { prefixClsIcon } from '../../_util/prefixClsIcon'
import { UploadChangeParam } from '../interface'
import '../style'
import './index.less'

const { Dragger } = Upload

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info: UploadChangeParam) {
    const { status } = info.file
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      console.log('file uploaded successful')
    } else if (status === 'error') {
      console.log('file upload failed')
    }
  },
  onDrop(e: React.DragEvent<HTMLDivElement>) {
    console.log('Dropped files', e.dataTransfer.files)
  },
}

export default () => {
  return (
    <div className="upload-dragger">
      <Dragger {...props}>
        {prefixClsIcon(<Icon icon={'inbox'} size={'2x'} />)}
        <p className="text">点击或者拖动文件到虚线框内上传</p>
        <p className="hint">支持docx、xls、PDF、rar、zip、PNG、JPG等类型的文件</p>
      </Dragger>
    </div>
  )
}
