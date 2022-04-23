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
      <Divider orientation="left">
        <span className="divider">职位分类</span>
      </Divider>
      <Tag size="large" color="blue">
        最新职位
      </Tag>

      {jobCategoryList}

      <Tag size="large" color="orange">
        更多......
      </Tag>
    </div>
  )
}

export default JobCategory
