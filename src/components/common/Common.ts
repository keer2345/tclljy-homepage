import {
  fetchFirmIndustry,
  fetchFirmNature,
  fetchFirmScale,
} from '@/services/firm'
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

// 加载企业性质
export const getFirmNature = async (enable: number) => {
  try {
    let res
    if (enable == -99) {
      res = await fetchFirmNature({})
    } else {
      res = await fetchFirmNature({ enable: enable })
    }
    if (res.success) {
      const result = res.data
      let array: any = []
      result.map((item: any) => {
        array.push({ value: item.id, label: item.name })
      })
      return array
    }
  } catch (error) {
    message.error('加载企业性质失败')
  }
}

// 加载企业规模
export const getFirmScale = async (enable: number) => {
  try {
    let res
    if (enable == -99) {
      res = await fetchFirmScale({})
    } else {
      res = await fetchFirmScale({ enable: enable })
    }
    if (res.success) {
      const result = res.data
      let array: any = []
      result.map((item: any) => {
        array.push({ value: item.id, label: item.name })
      })
      return array
    }
  } catch (error) {
    message.error('加载企业规模失败')
  }
}

// 加载企业所属行业
export const getFirmIndustry = async (enable: number) => {
  try {
    let res
    if (enable == -99) {
      res = await fetchFirmIndustry({})
    } else {
      res = await fetchFirmIndustry({ enable: enable })
    }
    if (res.success) {
      const result = res.data
      let array: any = []
      result.map((item: any) => {
        array.push({ value: item.id, label: item.name })
      })
      return array
    }
  } catch (error) {
    message.error('加载企业所属行业失败')
  }
}

// 加载省份
