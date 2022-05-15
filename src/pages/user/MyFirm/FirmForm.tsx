import React from 'react'
import ProForm, {
  ProFormText,
  ProFormRadio,
  ProFormSelect,
} from '@ant-design/pro-form'

const FirmForm = ({
  formItemLayout,
  firm,
  firmNature,
  firmScale,
  firmIndustry,
}) => {
  const handleSubmit = async (values) => {
    console.log('values:', {
      ...firm,
      ...values,
      nature: { id: values.firmNature },
      scale: { id: values.firmScale },
      industry: { id: values.firmIndustry },
    })
  }
  return (
    <ProForm
      {...formItemLayout}
      layout={'horizontal'}
      initialValues={{
        ...firm,
        firmNature: firm.nature.id,
        firmScale: firm.scale.id,
        firmIndustry: firm.industry.id,
      }}
      onFinish={async (values) => {
        await handleSubmit(values)
      }}
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
      <ProFormSelect
        width="md"
        label="企业性质"
        name="firmNature"
        options={firmNature}
      />
      <ProFormSelect
        width="md"
        label="企业规模"
        name="firmScale"
        options={firmScale}
      />
      <ProFormSelect
        width="md"
        label="所属行业"
        name="firmIndustry"
        options={firmIndustry}
      />
    </ProForm>
  )
}

export default FirmForm
