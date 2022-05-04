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

//判断收藏
export async function fetchResumeFavJob(jobid: string, resumeid: string) {
  return request<API.RespResult>(
    '/api/fav/job/status/' + jobid + '/' + resumeid,
    {
      method: 'GET',
    },
  )
}

//判断投递
export async function fetchResumeSendJob(jobid: string, resumeid: string) {
  return request<API.RespResult>(
    '/api/send/job/status/' + jobid + '/' + resumeid,
    {
      method: 'GET',
    },
  )
}

//收藏职位，取消收藏职位
export async function resumeFavJob(
  fav: boolean, //原状态
  jobid: string,
) {
  return request<API.RespResult>(
    '/api/fav/job/' + (fav ? 'off' : 'on') + '/' + jobid,
    { method: 'POST' },
  )
}
//投递职位
export async function resumeSendJob(
  body: Job.SendMessage,
  params?: { [key: string]: any },
) {
  return request<API.RespResult>('/api/send', {
    method: 'POST',
    // headers: { 'Content-Type': 'application/json' },
    data: body,
    params,
  })
}
