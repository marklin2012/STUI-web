import React from 'react'
import { Collapse } from '../../index'
import './index.less'
import { HeaderTypes, PanelTypes } from './dataConst'

export default () => {
  const { Panel } = Collapse // 定义个别名
  return (
    <div className="collapse">
      <Collapse defaultActiveKey={['0']}>
        <Panel header={HeaderTypes[0]} key={'0'}>
          <p>{PanelTypes[0]}</p>
        </Panel>
        <Panel header={HeaderTypes[1]} key={'1'} collapsible={'disabled'}>
          <p>{PanelTypes[1]}</p>
        </Panel>

        <Panel header={HeaderTypes[2]} key={'2'} collapsible={'disabled'}>
          <p>{PanelTypes[2]}</p>
        </Panel>
      </Collapse>
      {/* <Collapse collapsible={'disabled'}>
            <Panel header={HeaderTypes[1]} key={'1'} collapsible={'disabled'}>
                <p>{PanelTypes[1]}</p>
            </Panel>

            <Panel header={HeaderTypes[2]} key={'2'} collapsible={'disabled'}>
                <p>{PanelTypes[2]}</p>
            </Panel>
        </Collapse> */}
    </div>
  )
}
