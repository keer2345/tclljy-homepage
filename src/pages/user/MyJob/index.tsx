import React, { useEffect, useState } from 'react'
import ProCard from '@ant-design/pro-card'
import { Row, Col, Card, message } from 'antd'
import { Link, history } from 'umi'
import { getUser } from '@/components/common/Common'
import { fetchFirm } from '@/services/firm'

const MyJob = () => {
  const [userinfo, setUserinfo] = useState({})
  const [firm, setFirm] = useState({})
  const [firmLoading, setFirmLoading] = useState(true)
  const [jobLoading, setJobLoading] = useState(true)

  useEffect(() => {
    getUser().then((user) => {
      if (user.firm > 0) {
        fetchFirm(user.id, user.firm).then((res) => {
          setFirm(res.data)
          setFirmLoading(false)
        })
      }
    })
  }, [])

  return (
    <>
      <ProCard direction="column" ghost gutter={[0, 8]}>
        <ProCard layout="left" bordered>
          <Link to="/user/account">返回个人主页</Link>
        </ProCard>
      </ProCard>
      <Card
        title="企业的职位列表"
        extra={<a href="/user/company">{firm.name}</a>}
      ></Card>
    </>
  )
}

export default MyJob
