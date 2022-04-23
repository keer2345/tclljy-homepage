import { getJobCategoryEnable } from '@/services/job'
import React, { useEffect, useState } from 'react'
import { Tag, Divider } from 'antd'
import './JobCategory.css'

const JobCategory = () => {
  const [jobCategory, setJobCategory] = useState([])

  const colors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ]

  useEffect(() => {
    getJobCategory()
  }, [])

  const getJobCategory = async () => {
    const jobCategoryRes = await getJobCategoryEnable()
    setJobCategory(jobCategoryRes.data)
  }

  const jobCategoryList = jobCategory.map((item) => (
    <Tag key={item.id} color={colors[parseInt(Math.random() * colors.length)]}>
      {item.name}
    </Tag>
  ))

  return (
    <div>
      <Divider orientation="left">职位分类</Divider>
      <Tag size="large" color={colors[parseInt(Math.random() * colors.length)]}>
        最新职位
      </Tag>

      {jobCategoryList}

      <Tag size="large" color={colors[parseInt(Math.random() * colors.length)]}>
        更多......
      </Tag>
    </div>
  )
}

export default JobCategory
