import React from 'react'
import InternalAvatar, { AvatarProps } from './avatar'
import Group from './group'

export type { AvatarProps } from './avatar'
export type { GroupProps } from './group'

interface CompoundedCompoment
  extends React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLElement>> {
  Group: typeof Group
}

const Avatar = InternalAvatar as CompoundedCompoment
Avatar.Group = Group

export default Avatar
