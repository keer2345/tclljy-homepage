import { request } from 'umi'

// 获取 job category
export async function getJobCategoryEnable(options?: { [key: string]: any }) {
  return request<API.RespResult>('/api/jobCategory?enable=1', {
    method: 'GET',
    ...(options || {}),
  })
}

// 获取职位列表
export async function fetchJobList(params?: { [key: string]: any }) {
  return request<API.RespResult>('/api/job', {
    method: 'GET',
    params,
  })
}

// 获取指定职位
export async function fetchJob(id: string, params?: { [key: string]: any }) {
  return request<API.RespResult>('/api/job/' + id, {
    method: 'GET',
    params,
  })
}
