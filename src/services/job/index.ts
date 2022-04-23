import { request } from 'umi'

// 获取 job category
export async function getJobCategoryEnable(options?: { [key: string]: any }) {
  return request<API.RespResult>('/api/jobCategory?enable=1', {
    method: 'GET',
    ...(options || {}),
  })
}
