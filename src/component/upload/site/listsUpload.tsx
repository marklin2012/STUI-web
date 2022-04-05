import React, { useState } from 'react'
import { Upload, Button, Icon } from '../../..'
import { UploadChangeParam, UploadFile } from '../interface'
import '../style'
import './index.less'

function ListsUpload() {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'IMG.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    } as UploadFile,
  ])

  function handleChange(info: UploadChangeParam) {
    let fileList = [...info.fileList]

    fileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.url
      }
      return file
    })

    setFileList(fileList)
  }

  const props = {
    onChange: handleChange,
    multiple: true,
  }

  return (
    <div className="upload">
      <Upload {...props} listType="picture" fileList={fileList}>
        <Button className="upload-btn" icon={<Icon icon={'inbox'} />}>
          上传
        </Button>
      </Upload>
    </div>
  )
}

export default () => <ListsUpload />
