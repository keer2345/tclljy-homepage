import { getJobCategoryEnable } from '@/services/job'
import React, { useEffect, useState } from 'react'
import { Tag, Divider } from 'antd'
import './JobCategory.css'
import { history } from 'umi'

const JobCategory = ({ from, changeCategoryId, changeCategoryName }) => {
  const [jobCategory, setJobCategory] = useState([])
  const [jobCategoryId, setJobCategoryId] = useState('')

  const colors =
    from === 'top'
      ? [
          'magenta',
          'coral',
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
          'peru',
          'tomato',
        ]
      : ['blue']

  useEffect(() => {
    getJobCategory()
  }, [])

  const onClickTag = (jobCategoryId) => {
    setJobCategoryId(jobCategoryId)
    changeCategoryId(jobCategoryId)
    if (jobCategoryId != '') {
      changeCategoryName(
        jobCategory.find((item) => item.id === jobCategoryId).name,
      )
    }
  }

  const getJobCategory = async () => {
    const jobCategoryRes = await getJobCategoryEnable()
    setJobCategory(jobCategoryRes.data)
  }

  const jobCategoryList = jobCategory.map((item) => (
    <Tag
      key={item.id}
      color={
        item.id === jobCategoryId
          ? 'orangered'
          : colors[parseInt(Math.random() * colors.length)]
      }
      className="tag"
    >
      {from === 'list' && (
        <button onClick={() => onClickTag(item.id)}>{item.name}</button>
      )}
      {from === 'top' && (
        <button
          onClick={() => {
            history.push('/job')
          }}
        >
          {item.name}
        </button>
      )}
    </Tag>
  ))

  return (
    <div>
      {from == 'list' && (
        <Tag size="large" color="orange" className="tag">
          <button onClick={() => onClickTag('')}>全部职位</button>
        </Tag>
      )}

      {jobCategoryList}

      {from == 'top' && (
        <Tag size="large" color="orange" className="tag">
          <button onClick={() => history.push('/job')}>更多......</button>
        </Tag>
      )}
    </div>
  )
}

export default JobCategory
