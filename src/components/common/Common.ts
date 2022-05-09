import { getUserInfo } from '@/services/user'
import { message } from 'antd'

export const getUser = async () => {
  try {
    const res = await getUserInfo()
    if (res.success) {
      return res.data
    }
  } catch (error) {
    message.error(error.data.msg)
  }
}

export const replaceEnter = (str: string, innerId) => {
  const desc = str.replace(/\n/g, '<br />')
  const span = document.querySelector(innerId)
  span.innerHTML = desc
}
