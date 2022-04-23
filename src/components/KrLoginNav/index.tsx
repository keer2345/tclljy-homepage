import React, { useEffect, useState } from 'react'
import { Link } from 'umi'
import { Button } from 'antd'

const KrLoginNav = () => {
  const [login, setLogin] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      setLogin(true)
    }
  }, [])
  return (
    <>
      {!login ? (
        <div>
          发布招聘求职信息，请先
          <Button type="link">
            <Link to="/user/login">登录</Link>
          </Button>
          或
          <Button type="link">
            <Link to="/user/register">注册</Link>
          </Button>
        </div>
      ) : (
        <div>
          <Button type="link">
            <Link to="/user/login">发布职位</Link>
          </Button>
          或
          <Button type="link">
            <Link to="/user/register">发布简历</Link>
          </Button>
        </div>
      )}
    </>
  )
}

export default KrLoginNav
