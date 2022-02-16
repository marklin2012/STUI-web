import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import Alert from './index'

describe('<Alert kind="warning">msg</Alert>', () => {
  it('render Alert with dumi', () => {
    const msg = '这是一条警告提示'

    render(<Alert kind="warning">msg</Alert>)
    expect(screen.queryByText(msg)).toBeInTheDocument()
  })
})
