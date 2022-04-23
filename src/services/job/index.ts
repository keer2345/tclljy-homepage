import { request } from 'umi'

// 获取 job category
export async function getJobCategoryEnable(options?: { [key: string]: any }) {
  return request<API.RespResult>('/api/jobCategory?enable=1', {
    method: 'GET',
    ...(options || {}),
  })
}

// 获取职位(top10)
export async function getJobTop(options?: { [key: string]: any }) {
  return request<API.RespResult>('/api/job?enable=1&audit=1&pageSize=12', {
    method: 'GET',
    ...(options || {}),
  })
}
