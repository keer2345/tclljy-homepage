import { request } from 'umi'

// export async function currentUser(data,options){
//   return request("/api/account/userinfo",{
//     method:'GET',params:data,...(options||{})
//   })
// }

export function currentUser() {
  return request<API.RespResult>('/api/account/userinfo', { method: 'GET' })
}

export async function login(
  body: User.LoginParams,
  options?: { [key: string]: any },
) {
  const res = request<API.RespResult>('/api/account/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  })
  console.log('res::', res)
  return res
}
