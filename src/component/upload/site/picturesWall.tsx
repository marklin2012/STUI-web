import React, { useState } from 'react'
import { Upload, Modal, Icon } from '../../..'
import { prefixClsIcon } from '../../_util/prefixClsIcon'
import { RcFile, UploadChangeParam, UploadFile } from '../interface'
import '../style'
import './index.less'

function getBase64(file: RcFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file as unknown as Blob)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

function PicturesWall() {
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    } as UploadFile,
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    } as UploadFile,
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    } as UploadFile,
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    } as UploadFile,
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    } as UploadFile,
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    } as UploadFile,
  ])

  function handleCancel() {
    setPreviewVisible(false)
  }

  async function handlePreview(file: UploadFile) {
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file.originFileObj!)) as string
    }
    setPreviewImage(file.url || file.preview || '')
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url?.substring(file.url.lastIndexOf('/') + 1) || '')
  }

  function handleChange(info: UploadChangeParam) {
    setFileList(info.fileList)
  }

  const uploadBtn = (
    <div className="upload-add-btn">
      {prefixClsIcon(<Icon icon={'add'} size={'3x'} />)}
      <div className="cloumnSpace" />
      {<span className="text">{'上传图片'}</span>}
    </div>
  )

  return (
    <div className="upload">
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadBtn}
      </Upload>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}

export default () => <PicturesWall />
