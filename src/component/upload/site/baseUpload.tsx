import React from 'react'
import { Upload, Button, Icon } from '../../..'
import { UploadChangeParam } from '../interface'
import '../style'
import './index.less'

export default () => {
  const props = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: UploadChangeParam) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        console.log('file uploaded successful')
      } else if (info.file.status === 'error') {
        console.log('file upload failed')
      }
    },
  }
  return (
    <div className="upload">
      <Upload {...props}>
        <Button className="upload-btn" icon={<Icon icon={'upload'} />}>
          上传
        </Button>
      </Upload>
    </div>
  )
}
