import React from 'react'
import ProForm, {
  ProFormText,
  ProFormRadio,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-form'
import { CheckOutlined } from '@ant-design/icons'
import { checkTel } from '@/components/common/CheckRules'
import { message, Row, Col, Space } from 'antd'

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
      submitter={{
        render: (props, doms) => {
          return (
            <Row>
              <Col span={14} offset={8}>
                <Space>{doms}</Space>
              </Col>
            </Row>
          )
        },
      }}
      onFinish={async (values) => {
        await handleSubmit(values)
      }}
    >
      <ProFormText
        width="lg"
        name="name"
        label="企业名称"
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
        width="lg"
        label="企业性质"
        name="firmNature"
        options={firmNature}
      />
      <ProFormSelect
        width="lg"
        label="企业规模"
        name="firmScale"
        options={firmScale}
      />
      <ProFormSelect
        width="lg"
        label="所属行业"
        name="firmIndustry"
        options={firmIndustry}
      />
      <ProFormText
        width="lg"
        name="code"
        label="信用代码"
        placeholder="请输入统一社会信用代码"
        rules={[
          {
            required: true,
            min: 15,
            max: 18,
            message: '统一信用代码为15到18位！',
          },
        ]}
      />
      <ProFormTextArea
        width="lg"
        name="remark"
        label="企业介绍"
        rules={[{ required: true, message: '企业介绍不能为空！' }]}
      />
      <ProFormText
        width="lg"
        name="contactPerson"
        label="联系人"
        placeholder="请输入联系人"
        rules={[
          {
            required: true,
            message: '请输入联系人！',
          },
          {
            max: 10,
            message: '联系人不能超过10个字！',
          },
        ]}
      />
      <ProFormText
        width="lg"
        name="contactTel"
        label="联系电话"
        placeholder="请输入联系电话"
        rules={[
          {
            required: true,
            message: '请输入正确的电话号码！',
          },
          {
            min: 7,
            message: '电话号码需大于 7 位！',
          },
          {
            validator: checkTel,
          },
        ]}
      />
      <ProFormText
        width="lg"
        name="address"
        label="详细地址"
        placeholder="请输入详细地址"
      />
    </ProForm>
  )
}

export default FirmForm
