import React from 'react'
import { Tree, Icon } from '../../..'
import '../style'
import './index.less'

const treeData1 = [
  {
    title: '一级 1',
    key: '1',
    icon: <Icon icon={'smile'} />,
    children: [
      {
        title: '二级 1-1',
        key: '1-1',
        icon: <Icon icon={'shield'} />,
        children: [
          {
            title: '三级 1-1-1',
            key: '1-1-1',
            icon: <Icon icon={'file-alt'} />,
          },
          {
            title: '三级 1-1-2',
            key: '1-1-2',
            icon: <Icon icon={'file-archive'} />,
          },
          {
            title: '三级 1-1-3',
            key: '1-1-3',
            icon: <Icon icon={'file-audio'} />,
          },
        ],
      },
      {
        title: '二级 1-2',
        key: '1-2',
        icon: <Icon icon={'shield'} />,
        children: [
          {
            title: '三级 1-2-1',
            key: '1-2-1',
            icon: <Icon icon={'file-alt'} />,
          },
          {
            title: '三级 1-2-2',
            key: '1-2-2',
            icon: <Icon icon={'file-alt'} />,
          },
          {
            title: '三级 1-2-3',
            key: '1-2-3',
            icon: <Icon icon={'file-alt'} />,
          },
        ],
      },
    ],
  },
  {
    title: '一级 2',
    key: '2',
    icon: <Icon icon={'apple-whole'} />,
    children: [
      {
        title: '二级 2-1',
        key: '2-1',
        icon: <Icon icon={'file-alt'} />,
      },
      {
        title: '二级 2-2',
        key: '2-2',
        icon: <Icon icon={'file-alt'} />,
      },
    ],
  },
  {
    title: '一级 3',
    key: '3',
    icon: <Icon icon={'archway'} />,
  },
]

export default () => {
  return (
    <div className="treeDemo">
      <Tree showIcon switcherIcon={<Icon icon={'angle-down'} />} treeData={treeData1} />
    </div>
  )
}
