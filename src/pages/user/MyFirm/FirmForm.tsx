import React, { useEffect, useState } from 'react'
import ProForm, {
  ProFormText,
  ProFormRadio,
  ProFormSelect,
  ProFormTextArea,
  ProFormCascader,
} from '@ant-design/pro-form'
import { CheckOutlined } from '@ant-design/icons'
import { checkTel } from '@/components/common/CheckRules'
import { message, Row, Col, Space } from 'antd'
import { getRespToArrary } from '@/components/common/Common'

const FirmForm = ({
  formItemLayout,
  firm,
  firmNature,
  firmScale,
  firmIndustry,
  provinces,
  cities,
  regions,
}) => {
  const [firmNew, setFirmNew] = useState(firm)
  const [city, setCity] = useState(cities)
  const [region, setRegion] = useState(regions)

  const handleSubmit = async (values) => {
    console.log('values:', {
      ...firmNew,
      ...values,
      nature: { id: values.firmNature },
      scale: { id: values.firmScale },
      industry: { id: values.firmIndustry },
      province: { id: values.firmProvince },
    })
  }

  const regionComponent = (region) => {
    console.log('region:')
    return (
      <ProFormSelect
        width="lg"
        label="所在区县"
        name="firmRegion"
        placeholder="请选择区县"
        options={region}
        rules={[{ required: true, message: '请选择所属区县！' }]}
      />
    )
  }

  return (
    <ProForm
      {...formItemLayout}
      layout={'horizontal'}
      initialValues={{
        ...firmNew,
        firmNature: firmNew.nature.id,
        firmScale: firmNew.scale.id,
        firmIndustry: firmNew.industry.id,
        firmProvince: firmNew.province.id,
        // firmCity: firmNew.city.id,
        // firmRegion: firmNew.region.id,
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
        rules={[{ required: true, message: '请选择企业性质！' }]}
      />
      <ProFormSelect
        width="lg"
        label="企业规模"
        name="firmScale"
        options={firmScale}
        rules={[{ required: true, message: '请选择企业规模！' }]}
      />
      <ProFormSelect
        width="lg"
        label="所属行业"
        name="firmIndustry"
        options={firmIndustry}
        rules={[{ required: true, message: '请选择所属行业！' }]}
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

      <ProFormSelect
        width="lg"
        label="所在省区"
        name="firmProvince"
        placeholder="请选择省区"
        options={provinces}
        rules={[{ required: true, message: '请选择所属省区！' }]}
        onChange={(value) => {
          setFirmNew({ ...firmNew, city: { id: '440100' } })
          getRespToArrary('/api/area', '加载城市列表失败', 1, {
            enable: 1,
            level: 2,
            parentId: value,
          }).then((res) => setCity(res))
        }}
      />

      <ProFormSelect
        width="lg"
        label="所在城市"
        name="firmCity"
        placeholder="请选择城市"
        options={city}
        rules={[{ required: true, message: '请选择所属城市！' }]}
        onChange={(value) => {
          setFirmNew({ ...firmNew, region: { id: '' } })
          getRespToArrary('/api/area', '加载区县列表失败', 1, {
            enable: 1,
            level: 3,
            parentId: value,
          }).then((res) => setRegion(res))
        }}
      />

      {regionComponent(region)}

      {/* <ProFormSelect
        width="lg"
        label="所在区县"
        name="firmRegion"
        placeholder="请选择区县"
        options={region}
        rules={[{ required: true, message: '请选择所属区县！' }]}
      /> */}
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
