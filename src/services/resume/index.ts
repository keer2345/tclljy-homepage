import { request } from 'umi'

// 获取简历列表
export async function fetchResumeList(params?: { [key: string]: any }) {
  return request<API.RespResult>('/api/resume', {
    method: 'GET',
    params,
  })
}
