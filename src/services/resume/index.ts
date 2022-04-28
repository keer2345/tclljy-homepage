import { request } from 'umi'

// 获取简历(top12)
export async function getResumeTop(options?: { [key: string]: any }) {
  return request<API.RespResult>('/api/resume?enable=1&audit=1&pageSize=12', {
    method: 'GET',
    ...(options || {}),
  })
}
