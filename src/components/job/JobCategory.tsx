import { getJobCategoryEnable } from '@/services/job'
import React, { useEffect, useState } from 'react'
import { Tag, Divider, Button } from 'antd'
import './JobCategory.css'
import { history } from 'umi'

const JobCategory = ({
  from,
  changeCategoryId,
  changeCategoryName,
  clearFlag,
}) => {
  const [jobCategory, setJobCategory] = useState([])
  const [jobCategoryId, setJobCategoryId] = useState('')

  useEffect(() => {
    setJobCategoryId('')
  }, [clearFlag])

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
          ? '#FF8C69'
          : colors[parseInt(Math.random() * colors.length)]
      }
      className="tag"
    >
      {from === 'list' && (
        <Button size="small" type="link" onClick={() => onClickTag(item.id)}>
          {item.name}
        </Button>
      )}
      {from === 'top' && (
        <Button
          size="small"
          type="link"
          onClick={() => {
            history.push('/job')
          }}
        >
          {item.name}
        </Button>
      )}
    </Tag>
  ))

  return (
    <div>
      {from == 'list' && (
        <Tag size="large" color="orange" className="tag">
          <Button size="small" type="link" onClick={() => onClickTag('')}>
            全部职位
          </Button>
        </Tag>
      )}

      {jobCategoryList}

      {from == 'top' && (
        <Tag size="large" color="orange" className="tag">
          <Button type="link" size="small" onClick={() => history.push('/job')}>
            更多......
          </Button>
        </Tag>
      )}
    </div>
  )
}

export default JobCategory
