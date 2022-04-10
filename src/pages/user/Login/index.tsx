import KrCarouselImage from '@/components/KrCarouselImage'
import KrLoginForm from '@/components/KrLoginForm'
import React, { useEffect } from 'react'
import { history } from 'umi'
import { message } from 'antd'

const Login = () => {
  useEffect(() => {
    if (localStorage.getItem('satoken') && localStorage.getItem('userid')) {
      message.success('您已登录!')
      if (!history) return
      const { query } = history.location
      const { redirect } = query as { redirect: string }
      history.push(redirect || '/')
    }
  }, [])
  return (
    <>
      <KrCarouselImage />
      <KrLoginForm />
    </>
  )
}

export default Login
