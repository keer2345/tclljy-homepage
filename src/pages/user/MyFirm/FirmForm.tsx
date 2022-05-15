import React from 'react'
import ProForm, { ProFormText, ProFormRadio } from '@ant-design/pro-form'

const FirmForm = ({ formItemLayout, firm }) => {
  return (
    <ProForm
      {...formItemLayout}
      layout={'horizontal'}
      initialValues={firm}
      // onFinish={() => console.log('on submit')}
    >
      <ProFormText
        width="md"
        name="name"
        label="企业名称"
        tooltip="企业名称不能超过30个字"
        placeholder="请输入企业名称"
        rules={[
          {
            required: true,
            min: 4,
            max: 30,
            message: '企业名称为4-30位字符！',
          },
        ]}
      />
    </ProForm>
  )
}

export default FirmForm
