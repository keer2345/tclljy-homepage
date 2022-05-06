import { request } from 'umi'

// 获取简历列表
export async function fetchResumeList(params?: { [key: string]: any }) {
  return request<API.RespResult>('/api/resume', {
    method: 'GET',
    params,
  })
}

// 获取指定简历
export async function fetchResume(userid: string, resumeid: string) {
  return request<API.RespResult>(
    '/api/resume/info/' + userid + '/' + resumeid,
    { method: 'GET' },
  )
}
