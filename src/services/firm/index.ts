import { request } from 'umi'

// 获取职位列表
export async function fetchFirmList(params?: { [key: string]: any }) {
  return request<API.RespResult>('/api/firm', {
    method: 'GET',
    params,
  })
}

// 获取指定企业
export async function fetchFirm(userid: string, firmid: string) {
  return request<API.RespResult>('/api/firm/info/' + userid + '/' + firmid, {
    method: 'GET',
  })
}
