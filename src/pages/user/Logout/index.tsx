import { logout } from '@/services/user'
import React, { useEffect } from 'react'
import { message } from 'antd'
import { history } from 'umi'

const Logout = () => {
  const exit = async () => {
    try {
      const res = await logout()

      if (res.success) {
        message.success('已退出登录！')
        localStorage.clear()
        history.push('/')
      }
    } catch (error) {
      console.log(error.data)
    }
  }
  useEffect(() => {
    exit()
  }, [])
  return <></>
}

export default Logout
