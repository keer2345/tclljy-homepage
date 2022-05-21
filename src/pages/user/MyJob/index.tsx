import React, { useEffect, useState } from 'react'
import ProCard from '@ant-design/pro-card'
import { Card } from 'antd'
import { Link } from 'umi'
import { getUser } from '@/components/common/Common'
import { fetchFirm } from '@/services/firm'
import JobList from './JobList'
import JobEdit from './JobForm'

const MyJob = () => {
  const [userinfo, setUserinfo] = useState({})
  const [firm, setFirm] = useState({})
  const [firmLoading, setFirmLoading] = useState(true)
  const [tag, setTag] = useState(1)

  useEffect(() => {
    getUser().then((user) => {
      setUserinfo(user)
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
      <Card title={firm.name} extra={<a href="/user/company">企业信息</a>}>
        {tag == 1 && !firmLoading && (
          <JobList userinfo={userinfo} setTag={setTag} />
        )}
        {tag == 2 && <JobEdit firm={firm} setTag={setTag} edit="add" />}
      </Card>
    </>
  )
}

export default MyJob
