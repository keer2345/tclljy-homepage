import { request } from 'umi'

// export async function currentUser(data,options){
//   return request("/api/account/userinfo",{
//     method:'GET',params:data,...(options||{})
//   })
// }

export async function getUserInfo(options?: { [key: string]: any }) {
  return request<API.RespResult>('/api/account/userinfo', {
    method: 'GET',
    ...(options || {}),
  })
}

export async function register(
  body: User.LoginParams,
  options?: { [key: string]: any },
) {
  return request<API.RespResult>('/api/account/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  })
}

export async function login(
  body: User.LoginParams,
  options?: { [key: string]: any },
) {
  return request<API.RespResult>('/api/account/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
    ...(options || {}),
  })
}

export async function getCaptchaCode() {
  // return request<API.RespResult>('/api/captcha/arti', { method: 'GET' })
  return request<API.RespResult>('/api/captcha/spec', { method: 'GET' })
}
