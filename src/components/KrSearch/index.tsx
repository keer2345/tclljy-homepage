import React, { useEffect, useState } from 'react'
import { Button, Input, Select, message, Alert } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styles from './index.less'
import { getSysParams } from '@/services/welcome'

const { Search } = Input
const { Option } = Select

const KrSearch = ({ search, value, changeSearchValue }) => {
  const [searchValue, setSearchValue] = useState(value)

  const onSearch = (e) => {
    changeSearchValue(searchValue)
  }
  useEffect(() => {
    setSearchValue(value)
  }, [value])

  return (
    <>
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
              style={{ width: '60%' }}
              placeholder="工作 / 人才 / 企业"
            />
          )}
          {search != 'all' && (
            <Input
              size="large"
              style={{ width: '70%' }}
              placeholder={
                search === 'job'
                  ? '找工作'
                  : search === 'resume'
                  ? '简历名称'
                  : '企业名称'
              }
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value.trim())}
              onPressEnter={(e) => onSearch(e)}
            />
          )}
          <Button
            type="primary"
            icon={<SearchOutlined style={{ fontSize: '18px' }} />}
            size="large"
            onClick={(e) => onSearch(e)}
          >
            搜　索
          </Button>
        </Input.Group>
      </div>
    </>
  )
}

export default KrSearch
