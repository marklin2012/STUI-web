import React from 'react'
import classNames from 'classnames'
import { CardPrefixCls } from '.'

export interface CardMetaProps {
  prefixCls?: string
  style?: React.CSSProperties
  className?: string
  avatar?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
}

const Meta: React.FC<CardMetaProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    avatar,
    title,
    description,
    ...restProps
  } = props

  const prefixCls = customizePrefixCls ?? CardPrefixCls
  const classString = classNames(`${prefixCls}-meta`, className)
  const avatarRender = avatar ? <div className={`${prefixCls}-meta-avatar`}>{avatar}</div> : null
  const titleRender = title ? <div className={`${prefixCls}-meta-title`}>{title}</div> : null
  const descriptionRender = description ? (
    <div className={`${prefixCls}-meta-description`}>{description}</div>
  ) : null
  const MetaDetail =
    titleRender || descriptionRender ? (
      <div className={`${prefixCls}-meta-detail`}>
        {titleRender}
        {descriptionRender}
      </div>
    ) : null
  return (
    <div {...restProps} className={classString}>
      {avatarRender}
      {MetaDetail}
    </div>
  )
}

export default Meta
