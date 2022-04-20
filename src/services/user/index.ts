import { request } from 'umi'

// export async function currentUser(data,options){
//   return request("/api/account/userinfo",{
//     method:'GET',params:data,...(options||{})
//   })
// }

// 获取用户信息
export async function getUserInfo(options?: { [key: string]: any }) {
  return request<API.RespResult>('/api/account/userinfo', {
    method: 'GET',
    ...(options || {}),
  })
}

// 注册
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

// 登录
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

// 退出
export async function logout() {
  return request<API.RespResult>('/api/account/logout', { method: 'GET' })
}

// 获取验证码
export async function getCaptchaCode() {
  // return request<API.RespResult>('/api/captcha/arti', { method: 'GET' })
  return request<API.RespResult>('/api/captcha/spec', { method: 'GET' })
}

// 修改用户信息
export async function updateUser(
  body: User.UserInfo,
  options?: { [key: string]: any },
) {
  return request<API.RespResult>('/api/user', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  })
}

// 修改密码
export async function updatePwd(
  body: User.UpdatePwd,
  options?: { [key: string]: any },
) {
  return request<API.RespResult>('/api/user/pwd', {
    method: 'POST',
    data: body,
    ...(options || {}),
  })
}
