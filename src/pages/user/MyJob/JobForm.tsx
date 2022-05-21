import React, { useEffect, useState } from 'react'
import { Card, Button, Row, Col, Space, Form, Switch, message } from 'antd'
import { getRespToArrary } from '@/components/common/Common'
import ProForm, {
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form'
import FormMessage from '@/components/common/FormMessage'
import { requestPromise } from '@/services/request'

const LAYOUT_TYPE_HORIZONTAL = 'horizontal'
const yesOrNo = [
  { value: true, label: '是' },
  { value: false, label: '否' },
]
const JobEdit = ({ firm, setTag, edit }) => {
  const [jobInfo, setJobInfo] = useState({})
  const [jobLoading, setJobLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)

  const [type, setType] = useState([])
  const [category, setCategory] = useState([])
  const [exp, setExp] = useState([])
  const [edu, setEdu] = useState([])

  const [updateState, setUpdateState] = useState<API.RespResult>({})

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  }
  const [formLayoutType, setFormLayoutType] = useState(LAYOUT_TYPE_HORIZONTAL)
  const [otherJobDisable, setOtherJobDisable] = useState(true)
  const [sfmy, setSfmy] = useState(false)

  useEffect(() => {
    getRespToArrary('/api/jobCategory', '加载工作类别失败', 1, {
      enable: '1',
    }).then((res) => {
      setCategory(res)
      getRespToArrary('/api/jobType', '加载工种形式失败', 1, {
        enable: '1',
      }).then((res) => {
        setType(res)
        getRespToArrary('/api/experience', '加载经验列表失败', 1, {
          enable: 1,
        }).then((res) => {
          setExp(res)
          getRespToArrary('/api/educational', '加载学历列表失败', 1, {
            enable: 1,
          }).then((res) => {
            setEdu(res)
            setJobLoading(false)
          })
        })
      })
    })
  }, [])

  const handleSubmit = async (values) => {
    const data = {
      ...jobInfo,
      ...values,
      jobType: { id: values.type },
      jobCategory: { id: values.category },
      experience: { id: values.exp },
      educational: { id: values.edu },
      mianyi: values.jobMianyi,
      firm: { id: firm.id },
    }
    console.log('value:', data)
    setSubmitLoading(true)
    updateJob(data)
  }

  const updateJob = async (data) => {
    try {
      const res = await requestPromise('/api/job', {}, data, 'POST')
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
    <Card
      type="inner"
      title={edit == 'add' ? '新建职位' : '编辑职位'}
      loading={jobLoading}
      extra={
        <Button
          key="1"
          type="primary"
          onClick={() => {
            setTag(1)
          }}
        >
          职位列表
        </Button>
      }
    >
      <ProForm
        // {...formItemLayout}
        layout={formLayoutType}
        grid={true}
        rowProps={{
          gutter: [16, formLayoutType === 'inline' ? 16 : 0],
        }}
        initialValues={{ ...jobInfo }}
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
      >
        {!success && msg && (
          <>
            <Row>
              <Col span={24}>
                <FormMessage content={msg || '提交失败！'} />
              </Col>
            </Row>
            {/* <Row>&nbsp;</Row> */}
          </>
        )}
        <Row>
          <ProFormText
            colProps={{ md: 14 }}
            width="lg"
            name="name"
            label={jobInfo.id ? '职位名称（修改后需重审）' : '职位名称'}
            placeholder="请输入职位名称"
            rules={[
              {
                required: true,
                min: 2,
                max: 20,
                message: '职位名称为2-20位字符！',
              },
            ]}
          />
          <ProFormSelect
            colProps={{ md: 10 }}
            width="lg"
            label="工种形式"
            name="type"
            options={type}
            rules={[{ required: true, message: '请选择工种形式！' }]}
          />
          <ProFormSelect
            colProps={{ md: 14 }}
            width="lg"
            label="职位类别"
            name="category"
            options={category}
            rules={[{ required: true, message: '请选择职位类别！' }]}
            onChange={(value, item) => {
              if (item.label == '其他') {
                setOtherJobDisable(false)
              } else {
                setOtherJobDisable(true)
              }
            }}
          />

          <ProFormText
            colProps={{ md: 10 }}
            width="lg"
            name="otherJob"
            label="其他类别"
            tooltip="职位类别选择其他时，才可输入"
            placeholder="可输入自定义的职位类别"
            disabled={otherJobDisable}
          />

          <ProFormTextArea
            width="lg"
            name="description"
            label="职位描述"
            rules={[
              { required: true, message: '职位描述不能为空！' },
              { min: 2, message: '职位描述太短了！' },
            ]}
          />
          <ProFormSelect
            colProps={{ md: 8 }}
            width="lg"
            label="经验要求"
            name="exp"
            options={exp}
            rules={[{ required: true, message: '请选择经验要求！' }]}
          />
          <ProFormSelect
            colProps={{ md: 8 }}
            width="lg"
            label="学历要求"
            name="edu"
            options={edu}
            rules={[{ required: true, message: '请选择学历要求！' }]}
          />
          <ProFormText
            colProps={{ md: 8 }}
            width="lg"
            name="profession"
            label="专业要求"
            placeholder="请输入专业要求"
          />
          <ProFormSelect
            colProps={{ md: 8 }}
            width="lg"
            label="薪资是否面议"
            name="jobMianyi"
            options={yesOrNo}
            rules={[{ required: true, message: '请选择是否面议！' }]}
            onChange={(value, item) => {
              if (item.label == '是') {
                setSfmy(true)
              } else {
                setSfmy(false)
              }
            }}
          />
          <ProFormDigit
            colProps={{ md: 8 }}
            width="lg"
            name="minSalary"
            label="最小薪资"
            placeholder="请输入最小薪资"
            disabled={sfmy}
            rules={[{ required: !sfmy, message: '请输入数字格式' }]}
          />
          <ProFormDigit
            colProps={{ md: 8 }}
            width="lg"
            name="maxSalary"
            label="最大薪资"
            placeholder="请输入最大薪资"
            disabled={sfmy}
            rules={[
              { required: !sfmy, message: '请输入数字格式' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('minSalary') < value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('最大薪资不能小于最小薪资！'))
                },
              }),
            ]}
          />

          <ProFormText
            colProps={{ md: 12 }}
            width="lg"
            name="zwld"
            label="职位亮点"
            placeholder="请输入职位亮点"
            rules={[{ required: true, message: '请输入职位亮点' }]}
          />
          <ProFormText
            colProps={{ md: 12 }}
            width="lg"
            name="weal"
            label="员工福利"
            placeholder="请输入员工福利"
            rules={[{ required: true, message: '请输入员工福利' }]}
          />
          <ProFormText
            colProps={{ md: 6 }}
            width="lg"
            name="chizhu"
            label="吃住情况"
            placeholder="请输入吃住情况"
            rules={[{ required: true, message: '请输入吃住情况' }]}
          />
          <ProFormText
            colProps={{ md: 6 }}
            width="lg"
            name="faxinri"
            label="发薪日期"
            placeholder="请输入发薪日期"
          />
          <ProFormText
            colProps={{ md: 6 }}
            width="lg"
            name="workTime"
            label="工作时间"
            placeholder="请输入工作时间"
            rules={[{ required: true, message: '请输入工作时间' }]}
          />
          <ProFormDigit
            colProps={{ md: 6 }}
            width="lg"
            name="workHours"
            label="工作时长"
            placeholder="请输入工作时长"
            rules={[{ required: true, message: '请输入工作时长' }]}
          />
          <ProFormText
            colProps={{ md: 8 }}
            width="lg"
            name="feiyong"
            label="入职所需费用"
            placeholder="请输入所需费用"
            rules={[{ required: true, message: '请输入所需费用' }]}
          />
        </Row>
      </ProForm>
    </Card>
  )
}

export default JobEdit
