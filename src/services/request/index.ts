import { request } from 'umi'

export async function requestPromise(
  url: string,
  params?: { [key: string]: any },
  data: { [key: string]: any } = {},
  method = 'GET',
) {
  let result
  if (method == 'GET') {
    result = request<API.RespResult>(url, { method, params })
  } else {
    result = request<API.RespResult>(url, { method, data, params })
  }
  return result
}
