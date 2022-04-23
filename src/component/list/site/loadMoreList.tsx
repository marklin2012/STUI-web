import React from 'react'
import { List, Avatar, Button } from '../../..'
import '../style'
import './index.less'

const spliceData: any[] = [
  {
    title: `标题文字`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'UI设计（或称界面设计）是指对软件的人机交互、操作逻辑、界面美观的整体设计；UI设计分为实体UI和虚拟UI。',
  },
  {
    title: `标题文字`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'UI设计（或称界面设计）是指对软件的人机交互、操作逻辑、界面美观的整体设计；UI设计分为实体UI和虚拟UI。',
  },
]

function LoadMoreList() {
  const [loading, setLoading] = React.useState(false)
  const [data, setDatas] = React.useState([...spliceData])

  function onLoadMore() {
    setLoading(true)
    spliceData.forEach((item) => {
      data.push(item)
    })
    setTimeout(() => {
      setDatas(data)
      setLoading(false)
    }, 2000)
  }

  function loadMore() {
    if (!loading) {
      return (
        <div className="loadMoreBtn">
          <Button type={'ghost'} onClick={onLoadMore}>
            加载更多
          </Button>
        </div>
      )
    }
    return null
  }

  return (
    <div className="listDemo">
      <List
        loading={loading}
        itemLayout={'horizontal'}
        loadMore={loadMore()}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button size={'small'} type="link">
                编辑
              </Button>,
              <Button size={'small'} type="link">
                订阅
              </Button>,
              <Button size={'small'} type="link">
                删除
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default () => <LoadMoreList />
