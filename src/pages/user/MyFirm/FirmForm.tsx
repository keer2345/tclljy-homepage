import React, { useState } from 'react'
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-form'
import { checkTel } from '@/components/common/CheckRules'
import { message, Row, Col, Space } from 'antd'
import { getRespToArrary } from '@/components/common/Common'
import FormMessage from '@/components/common/FormMessage'
import { requestPromise } from '@/services/request'

const FirmForm = ({
  formItemLayout,
  firm,
  firmNature,
  firmScale,
  firmIndustry,
  provinces,
  cities,
  regions,
  setTag,
}) => {
  const [firmNew, setFirmNew] = useState(firm)
  const [city, setCity] = useState(cities)
  const [region, setRegion] = useState(regions)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [updateState, setUpdateState] = useState<API.RespResult>({})

  const handleSubmit = async (values) => {
    const data = {
      ...firmNew,
      ...values,
      nature: { id: values.firmNature },
      scale: { id: values.firmScale },
      industry: { id: values.firmIndustry },
      province: { id: values.firmProvince },
      city: { id: values.firmCity },
      region: { id: values.firmRegion },
    }
    setSubmitLoading(true)
    updateFirm(data)
  }

  const updateFirm = async (data) => {
    try {
      const res = await requestPromise('/api/firm', {}, data, 'POST')
      if (res.success) {
        message.success('提交成功！')
        setTag(1)
      }
    } catch (error) {
      setSubmitLoading(false)
      message.error(error.data.msg || '操作失败！')
      setUpdateState(error.data)
    }
  }

  const { success, msg } = updateState
  return (
    <ProForm
      {...formItemLayout}
      layout={'horizontal'}
      initialValues={
        firm.id
          ? {
              ...firmNew,
              firmNature: firmNew.nature.id,
              firmScale: firmNew.scale.id,
              firmIndustry: firmNew.industry.id,
              firmProvince: firmNew.province.id,
              firmCity: firmNew.city.id,
              firmRegion: firmNew.region.id,
            }
          : { ...firmNew }
      }
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
        if (!submitLoading) {
          await handleSubmit(values)
        }
      }}
      onReset={async () => {
        setFirmNew({ ...firmNew, city: firm.city, region: firm.region })
        if (firmNew.id) {
          getRespToArrary('/api/area', '加载城市列表失败', 1, {
            enable: 1,
            level: 2,
            parentId: firm.province.id,
          }).then((res) => {
            setCity(res)
          })
          getRespToArrary('/api/area', '加载城市列表失败', 1, {
            enable: 1,
            level: 3,
            parentId: firm.city.id,
          }).then((res) => {
            setRegion(res)
          })
        }
      }}
    >
      {!success && msg && (
        <Row>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 10, offset: 6 }}
          >
            <FormMessage content={msg || '提交失败！'} />
          </Col>
        </Row>
      )}
      <ProFormText
        width="lg"
        name="name"
        label={firm.id ? '企业名称（修改后需重新审核）' : '企业名称'}
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
        label={firm.id ? '信用代码（修改后需重新审核）' : '信用代码'}
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
          setFirmNew({ ...firmNew, city: { id: '' }, region: { id: '' } })
          getRespToArrary('/api/area', '加载城市列表失败', 1, {
            enable: 1,
            level: 2,
            parentId: value,
          }).then((res) => setCity(res))
        }}
      />

      <ProFormSelect
        id="firmCitySelect"
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

      <ProFormSelect
        width="lg"
        label="所在区县"
        name="firmRegion"
        placeholder="请选择区县"
        options={region}
        rules={[{ required: true, message: '请选择所属区县！' }]}
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
