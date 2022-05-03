import { request } from 'umi'

/**
 * 获取系统参数
 */
export async function getSysParams(params: { [key: string]: any }) {
  let url = '/api/param'
  params = { ...params, currentPage: 0, sort: 'id,asc' }

  const result = request(url, { method: 'GET', params })
  return result
}
