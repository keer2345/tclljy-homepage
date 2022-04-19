import React from 'react'

import ProCard from '@ant-design/pro-card'
import { Row, Col, Space } from 'antd'
import ProForm, { ProFormText } from '@ant-design/pro-form'
import FormMessage from '@/components/common/FormMessage'

const UpdateUserInfo = ({ userInfo, updateState, handleSubmit }) => {
  const { success, msg } = updateState

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }

  return (
    <ProCard title="个人资料" headerBordered>
      <div
        style={{
          margin: 24,
        }}
      >
        <ProForm
          // labelWidth="auto"
          layout={'horizontal'}
          size={'large'}
          {...formItemLayout}
          submitter={{
            render: (props, doms) => {
              return (
                <Row>
                  <Col span={14} offset={4}>
                    <Space>{doms}</Space>
                  </Col>
                </Row>
              )
            },
          }}
          onFinish={async (values) => {
            await handleSubmit(values as User.UserInfo)
          }}
        >
          {!success && msg && <FormMessage content={msg || '修改失败'} />}
          <ProFormText
            width="md"
            name="username"
            label="账号"
            tooltip="账号注册后不可更改"
            placeholder={userInfo.username}
            value={userInfo.username}
            disabled
          />
          <ProFormText
            width="md"
            name="realname"
            label="姓名"
            tooltip="可输入您的真实姓名"
            placeholder="请输入姓名"
            value={userInfo.realname}
          />
          <ProFormText
            width="md"
            name="identity"
            label="证件号码"
            placeholder="请输入证件号码"
            value={userInfo.identity}
          />
        </ProForm>
      </div>
    </ProCard>
  )
}

export default UpdateUserInfo
