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

// 获取企业性质
export async function fetchFirmNature(params?: { [key: string]: any }) {
  return request<API.RespResult>('/api/firmNature', {
    method: 'GET',
    params,
  })
}

// 获取企业规模
export async function fetchFirmScale(params?: { [key: string]: any }) {
  return request<API.RespResult>('/api/firmScale', {
    method: 'GET',
    params,
  })
}

// 获取企业行业
export async function fetchFirmIndustry(params?: { [key: string]: any }) {
  return request<API.RespResult>('/api/firmIndustry', {
    method: 'GET',
    params,
  })
}
