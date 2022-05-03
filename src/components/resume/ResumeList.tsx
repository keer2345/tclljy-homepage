import React, { useEffect, useState } from 'react'
import { Card, Row, Col, message } from 'antd'
import { fetchResumeList } from '@/services/resume'
import ResumeCard from './ResumeCard'

const ResumeList = ({ from }: any) => {
  const [resumeList, setResumeList] = useState([])

  useEffect(() => {
    let params: { [key: string]: any } = {}

    if (from === 'top') {
      params['pageSize'] = 12
      params['enable'] = 1
      params['audit'] = 1
    }

    getResumeList(params)
  }, [])

  const getResumeList = async (params: { [key: string]: any }) => {
    try {
      const res = await fetchResumeList(params)
      if (res.success) {
        let contents = res.data.contents
        for (var index in contents) {
          contents[index]['categories'] = contents[index].categories.sort(
            (a: any, b: any) => a.sort - b.sort,
          )
          if (contents[index].otherJob) {
            contents[index]['categories'].find(
              (item: any) => item.name == '其他',
            ).name = '其他 (' + contents[index].otherJob + ')'
          }
          contents[index].age =
            new Date().getFullYear() -
            new Date(contents[index].birthday).getFullYear()
        }

        setResumeList(contents)
      }
    } catch (error) {
      message.error('加载职位信息失败，服务器连接错误')
    }
  }

  const resumeIndexTop = resumeList.map((item) => <ResumeCard item={item} />)

  return (
    <div className="site-card-border-less-wrapper">
      <div className="site-card-wrapper">
        <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 20 }}>{resumeIndexTop}</Row>
      </div>
    </div>
  )
}

export default ResumeList
