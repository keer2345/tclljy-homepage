import React from 'react'
import { Button } from 'antd'

const Loading = ({ loading, content = '加载中...' }) => {
  return (
    <Button type="primary" loading={loading}>
      {content}
    </Button>
  )
}

export default Loading
