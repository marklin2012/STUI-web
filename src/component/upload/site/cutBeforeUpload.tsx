import React, { useState } from 'react'
import { Upload, Button, Icon } from '../../..'
import { UploadChangeParam, UploadFileStatus } from '../interface'
import '../style'
import './index.less'

function CutBeforeUpload() {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done' as UploadFileStatus,
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ])

  function onChange() {}

  function onPreview() {}

  return (
    <div className="upload">
      <Upload
        listType={'picture-card'}
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </div>
  )
}

export default () => <CutBeforeUpload />
