import React from 'react'
import { Alert } from 'antd'

const FormMessage: React.FC<{ content: string }> = ({ content }) => (
  <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
)

export default FormMessage
