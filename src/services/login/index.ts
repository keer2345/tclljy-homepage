import request from '@/utils/request'

export async function currentUser(data, options) {
  return request('/api/account/userinfo', {
    method: 'GET',
    params: data,
    ...(options || {}),
  })
}
