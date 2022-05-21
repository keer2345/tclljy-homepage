import { fetchArea } from '@/services/common/Area'
import {
  fetchFirmIndustry,
  fetchFirmNature,
  fetchFirmScale,
} from '@/services/firm'
import { requestPromise } from '@/services/request'
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

// 加载列表并转换成 {value:xxx, label:yyy}
export const getRespToArrary = async (
  url: string,
  msg: string,
  convert: number, // 1-转换
  params?: { [key: string]: any },
) => {
  try {
    const res = await requestPromise(url, params)
    if (res.success) {
      const result = res.data
      let array: any = []
      if (convert == 1) {
        result.map((item: any) => {
          array.push({ value: item.id, label: item.name })
        })
        return array
      } else {
        return result
      }
    }
  } catch (error) {
    message.error(msg)
  }
}
