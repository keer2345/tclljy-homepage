import React, { useEffect, useState } from 'react'
import ProCard from '@ant-design/pro-card'
import { Button, Card } from 'antd'
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
  const [jobid, setJobid] = useState('0')

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
          <Link to="/">首页</Link>&nbsp;/&nbsp;
          <Link to="/user/account">个人主页</Link>
          {tag != 1 && (
            <>
              &nbsp;/&nbsp;<a onClick={() => setTag(1)}>我的职位</a>
            </>
          )}
        </ProCard>
      </ProCard>
      <Card title={firm.name} extra={<a href="/user/company">企业信息</a>}>
        {tag == 1 && !firmLoading && (
          <JobList userinfo={userinfo} setTag={setTag} setJobid={setJobid} />
        )}
        {tag == 2 && (
          <JobEdit
            userinfo={userinfo}
            firm={firm}
            setTag={setTag}
            edit="add"
            jobid="0"
          />
        )}
        {tag == 3 && jobid != '0' && (
          <JobEdit
            userinfo={userinfo}
            firm={firm}
            setTag={setTag}
            edit="edit"
            jobid={jobid}
          />
        )}
      </Card>
    </>
  )
}

export default MyJob
