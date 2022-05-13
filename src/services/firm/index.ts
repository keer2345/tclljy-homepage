import { request } from 'umi'

// 获取职位列表
export async function fetchFirmList(params?: { [key: string]: any }) {
  return request<API.RespResult>('/api/firm', {
    method: 'GET',
    params,
  })
}
