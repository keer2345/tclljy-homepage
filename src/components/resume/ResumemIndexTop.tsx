import React, { useEffect, useState } from 'react'
import { Card, Row, Col, message } from 'antd'
import { getResumeTop } from '@/services/resume'
import ResumeCard from './ResumeCard'

const ResumemIndexTop = () => {
  const [resumeList, setResumeList] = useState([])

  useEffect(() => {
    getResumeList()
  }, [])

  const getResumeList = async () => {
    try {
      const res = await getResumeTop()
      if (res.success) {
        let contents = res.data.contents
        for (var index in contents) {
          contents[index]['categories'] = contents[index].categories.sort(
            (a, b) => a.sort - b.sort,
          )
          if (contents[index].otherJob) {
            contents[index]['categories'].find(
              (item) => item.name == '其他',
            ).name = '其他 (' + contents[index].otherJob + ')'
            console.log('aaa')
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

export default ResumemIndexTop
