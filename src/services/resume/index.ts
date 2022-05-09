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

//判断收藏
export async function fetchFirmFavJob(resumeid: string, firmid: string) {
  return request<API.RespResult>(
    '/api/fav/resume/status/' + resumeid + '/' + firmid,
    {
      method: 'GET',
    },
  )
}

//收藏简历，取消收藏简历
export async function firmFavJob(
  fav: boolean, //原状态
  resumeid: string,
) {
  return request<API.RespResult>(
    '/api/fav/resume/' + (fav ? 'off' : 'on') + '/' + resumeid,
    { method: 'POST' },
  )
}
