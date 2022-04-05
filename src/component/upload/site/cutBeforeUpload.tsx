import React, { useState } from 'react'
import { Upload, Icon } from '../../..'
import { prefixClsIcon } from '../../_util/prefixClsIcon'
import { UploadChangeParam, UploadFile, UploadFileStatus } from '../interface'
import '../style'
import './index.less'
import ImgCrop from '../../imgCrop'

function CutBeforeUpload() {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done' as UploadFileStatus,
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    } as UploadFile,
  ])

  function onChange(info: UploadChangeParam<UploadFile>) {
    setFileList(info.fileList)
  }

  async function onPreview(file: UploadFile) {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj as Blob)
        reader.onload = () => resolve(reader.result as string)
      })
    }
    const image = new Image()
    image.src = src!
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  return (
    <div className="upload">
      <ImgCrop rotate>
        <Upload
          listType={'picture-card'}
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 5 && (
            <div className="upload-add-btn">
              {prefixClsIcon(<Icon icon={'add'} size={'3x'} />)}
              <div className="cloumnSpace" />
              {<span className="text">{'上传图片'}</span>}
            </div>
          )}
        </Upload>
      </ImgCrop>
    </div>
  )
}

export default () => <CutBeforeUpload />
