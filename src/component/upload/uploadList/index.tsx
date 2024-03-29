import React from 'react'
import CSSMotion, { CSSMotionList, CSSMotionListProps } from 'rc-motion'
import classNames from 'classnames'
import { cloneElement, isValidElement } from '../../_util/reactNode'
import { UploadListProps, UploadFile, UploadListType } from '../interface'
import { previewImage, isImageUrl } from '../utils'
import collapseMotion from '../../_util/motion'
import Button, { ButtonProps } from '../../button'
import useForceUpdate from '../../_util/hooks/useForceUpdate'
import ListItem from './ListItem'
import Icon from '../../icon'
import { prefixClsIcon } from '../../_util/prefixClsIcon'

const listItemMotion: Partial<CSSMotionListProps> = {
  ...collapseMotion,
}
delete listItemMotion.onAppearEnd
delete listItemMotion.onEnterEnd
delete listItemMotion.onLeaveEnd

const InternalUploadList: React.ForwardRefRenderFunction<unknown, UploadListProps> = (
  {
    listType,
    previewFile,
    onPreview,
    onDownload,
    onRemove,
    locale,
    iconRender,
    isImageUrl: isImgUrl,
    prefixCls: customizePrefixCls,
    items = [],
    showPreviewIcon,
    showRemoveIcon,
    showDownloadIcon,
    removeIcon,
    previewIcon,
    downloadIcon,
    progress,
    appendAction,
    appendActionVisible,
    itemRender,
  },
  ref,
) => {
  const forceUpdate = useForceUpdate()
  const [motionAppear, setMotionAppear] = React.useState(false)

  React.useEffect(() => {
    if (listType !== 'picture' && listType !== 'picture-card') {
      return
    }
    ;(items || []).forEach((file: UploadFile) => {
      if (
        typeof document === 'undefined' ||
        typeof window === 'undefined' ||
        !(window as any).FileReader ||
        !(window as any).File ||
        !(file.originFileObj instanceof File || (file.originFileObj! as Blob) instanceof Blob) ||
        file.thumbUrl !== undefined
      ) {
        return
      }
      file.thumbUrl = ''
      if (previewFile) {
        previewFile(file.originFileObj as File).then((previewDataUrl: string) => {
          file.thumbUrl = previewDataUrl || ''
          forceUpdate()
        })
      }
    })
  }, [listType, items, previewFile])

  React.useEffect(() => {
    setMotionAppear(true)
  }, [])

  const onInternalPreview = (file: UploadFile, e?: React.SyntheticEvent<HTMLElement>) => {
    if (!onPreview) {
      return
    }
    e?.preventDefault()
    return onPreview(file)
  }

  const onInternalDownload = (file: UploadFile) => {
    if (typeof onDownload === 'function') {
      onDownload(file)
    } else if (file.url) {
      window.open(file.url)
    }
  }

  const onInternalClose = (file: UploadFile) => {
    onRemove?.(file)
  }

  const internalIconRender = (file: UploadFile) => {
    if (iconRender) {
      return iconRender(file, listType)
    }
    const isLoading = file.status === 'uploading'
    const fileIcon =
      isImgUrl && isImgUrl(file)
        ? prefixClsIcon(<Icon icon={'image'} />)
        : prefixClsIcon(<Icon icon={'file'} />)
    let icon: React.ReactNode = isLoading
      ? prefixClsIcon(<Icon icon={'spinner'} />)
      : prefixClsIcon(<Icon icon={'paperclip'} />)
    if (listType === 'picture') {
      icon = isLoading ? prefixClsIcon(<Icon icon={'spinner'} />) : fileIcon
    } else if (listType === 'picture-card') {
      icon = isLoading ? locale.uploading : fileIcon
    }
    return icon
  }

  const actionIconRender = (
    customIcon: React.ReactNode,
    callback: () => void,
    prefixCls: string,
    title?: string,
  ) => {
    const btnProps: ButtonProps = {
      type: 'text',
      size: 'small',
      title,
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        callback()
        if (isValidElement(customIcon) && customIcon.props.onClick) {
          customIcon.props.onClick(e)
        }
      },
      className: `${prefixCls}-list-item-card-actions-btn`,
    }
    if (isValidElement(customIcon)) {
      const btnIcon = cloneElement(customIcon, {
        ...customIcon.props,
        onClick: () => {},
      })

      return <Button {...btnProps} icon={btnIcon} />
    }
    return (
      <Button {...btnProps}>
        <span>{customIcon}</span>
      </Button>
    )
  }

  React.useImperativeHandle(ref, () => ({
    handlePreview: onInternalPreview,
    handleDownload: onInternalDownload,
  }))

  const prefixCls = customizePrefixCls ?? 'st-upload'

  const listClassNames = classNames({
    [`${prefixCls}-list`]: true,
    [`${prefixCls}-list-${listType}`]: true,
  })

  const motionKeyList = [
    ...items.map((file) => ({
      key: file.uid,
      file,
    })),
  ]

  const animationDirection = listType === 'picture-card' ? 'animate-inline' : 'animate'
  let motionConfig: Omit<CSSMotionListProps, 'onVisibleChanged'> = {
    motionDeadline: 2000,
    motionName: `${prefixCls}-${animationDirection}`,
    keys: motionKeyList,
    motionAppear,
  }
  if (listType !== 'picture-card') {
    motionConfig = {
      ...listItemMotion,
      ...motionConfig,
    }
  }

  return (
    <div className={listClassNames}>
      <CSSMotionList {...motionConfig} component={false}>
        {({ key, file, className: motionClassName, style: motionStyle }) => (
          <ListItem
            key={key}
            locale={locale}
            prefixCls={prefixCls}
            className={motionClassName}
            style={motionStyle}
            file={file}
            items={items}
            progress={progress}
            listType={listType}
            isImgUrl={isImgUrl}
            showPreviewIcon={showPreviewIcon}
            showRemoveIcon={showRemoveIcon}
            showDownloadIcon={showDownloadIcon}
            removeIcon={removeIcon}
            previewIcon={previewIcon}
            downloadIcon={downloadIcon}
            iconRender={internalIconRender}
            actionIconRender={actionIconRender}
            itemRender={itemRender}
            onPreview={onInternalPreview}
            onDownload={onInternalDownload}
            onClose={onInternalClose}
          />
        )}
      </CSSMotionList>

      {appendAction && (
        <CSSMotion {...motionConfig} visible={appendActionVisible} forceRender>
          {({ className: motionClassName, style: motionStyle }) =>
            cloneElement(appendAction, (oriProps) => ({
              className: classNames(oriProps.className, motionClassName),
              style: {
                ...motionStyle,
                // prevent the element has hover css pseudo-class that may cause animation to end prematurely.
                pointerEvents: motionClassName ? 'none' : undefined,
                ...oriProps.style,
              },
            }))
          }
        </CSSMotion>
      )}
    </div>
  )
}

const UploadList = React.forwardRef<unknown, UploadListProps>(InternalUploadList)

UploadList.displayName = 'UploadList'

UploadList.defaultProps = {
  listType: 'text' as UploadListType, // or picture
  progress: {
    strokeWidth: 2,
    showInfo: false,
  },
  showRemoveIcon: true,
  showDownloadIcon: false,
  showPreviewIcon: true,
  appendActionVisible: true,
  previewFile: previewImage,
  isImageUrl,
}

export default UploadList
