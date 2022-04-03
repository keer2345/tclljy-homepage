import React from 'react'
import { Button, Input, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styles from './index.less'

const { Search } = Input
const { Option } = Select
const onSearch = (value) => console.log(value)

const KeerSearch = () => {
  return (
    // <Space direction="vertical">
    //   <Search
    //     addonBefore="https://"
    //     placeholder="input search text"
    //     allowClear
    //     enterButton="Search"
    //     size="large"
    //     onSearch={onSearch}
    //   />
    // </Space>
    <div className="pm-8">
      <Input.Group compact>
        <Select defaultValue="找工作" size="large">
          <Option value="job">找工作</Option>
          <Option value="resume">招人才</Option>
          <Option value="firm">找企业</Option>
        </Select>
        <Input
          size="large"
          style={{ width: '50%' }}
          placeholder="工作 / 人才 / 企业"
        />
        <Button
          type="primary"
          icon={<SearchOutlined style={{ fontSize: '18px' }} />}
          size="large"
        >
          搜　索
        </Button>
      </Input.Group>
    </div>
  )
}

export default KeerSearch
