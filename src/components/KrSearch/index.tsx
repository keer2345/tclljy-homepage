import React from 'react'
import { Button, Input, Select, message, Alert } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styles from './index.less'
import { getSysParams } from '@/services/welcome'

const { Search } = Input
const { Option } = Select
const onSearch = (value) => console.log(value)
const search = async () => {
  console.log('search...')
  try {
    const res = await getSysParams({})
    console.log('res:', res)
  } catch (error) {
    console.log('error:', error.data.msg)
    message.error(error.data.msg)
  }
}
const KrSearch = ({ search }) => {
  return (
    <>
      {/* <div className="pm-8"> */}
      <div className="pm-8">
        <Input.Group compact>
          {search === 'all' && (
            <Select defaultValue="找工作" size="large">
              <Option value="job">找工作</Option>
              <Option value="resume">招人才</Option>
              <Option value="firm">找企业</Option>
            </Select>
          )}
          {search === 'all' && (
            <Input
              size="large"
              style={{ width: '50%' }}
              placeholder="工作 / 人才 / 企业"
            />
          )}
          {search === 'job' && (
            <Input size="large" style={{ width: '50%' }} placeholder="找工作" />
          )}
          <Button
            type="primary"
            icon={<SearchOutlined style={{ fontSize: '18px' }} />}
            size="large"
            onClick={search}
          >
            搜　索
          </Button>
        </Input.Group>
      </div>
      <div></div>
    </>
  )
}

export default KrSearch
