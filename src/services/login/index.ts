import { RespResult } from '@/types/RespResult'
import { request } from 'umi'

// export async function currentUser(data,options){
//   return request("/api/account/userinfo",{
//     method:'GET',params:data,...(options||{})
//   })
// }

export function currentUser() {
  return request<RespResult>('/api/account/userinfo', { method: 'GET' })
}
