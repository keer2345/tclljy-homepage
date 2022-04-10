import React, { useEffect } from 'react'
import { history } from 'umi'
import { message } from 'antd'

const Register = () => {
  useEffect(() => {
    if (localStorage.getItem('satoken') && localStorage.getItem('userid')) {
      message.success('您已登录!')
      if (!history) return
      const { query } = history.location
      const { redirect } = query as { redirect: string }
      history.push(redirect || '/')
    }
  }, [])
  return <div>Register</div>
}

export default Register
