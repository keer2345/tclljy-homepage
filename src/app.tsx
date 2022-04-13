import { PageLoading } from '@ant-design/pro-layout'
import { history } from 'umi'
import { message } from 'antd'
import { getUserInfo } from './services/user'
import type { Settings as LayoutSettings } from '@ant-design/pro-layout'

const loginPath = '/user/login'

// export const initialStateConfig = {
//   loading: <PageLoading />,
// }

// 配置全局 message
message.config({
  // duration: 1,
  maxCount: 1,
})

export async function getInitialState(): Promise<{
  // settings?: Partial<LayoutSettings>
  // userInfo?: User.UserInfo
  // loading?: boolean
  // fetchUserInfo?: () => Promise<User.UserInfo | undefined>
}> {
  const fetchUserInfo = async () => {
    // try {
    //   const msg = await getUserInfo()
    //   console.log('msg.data:', msg.data)
    //   return msg.data
    // } catch (error) {
    //   console.log(error.data.msg)
    // message.error(error.data.msg)
    // history.push(loginPath)
    // }
    return undefined
  }
  const userInfo = await fetchUserInfo()
  return {
    userInfo,
  }
}

//渲染之前做权限校验，
// export function render(oldRender) {
//   oldRender()
// }
