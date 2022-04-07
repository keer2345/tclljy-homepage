import { PageLoading } from '@ant-design/pro-layout'
import { history } from 'umi'
import { message } from 'antd'
import { currentUser as queryCurrentUser } from './services/login'

const loginPath = '/login'

// export const initialStateConfig = {
//   loading: <PageLoading />,
// }

// 配置全局 message
message.config({
  // duration: 1,
  maxCount: 1,
})

export async function getInitialState() {
  const fetchUserInfo = async () => {
    // try {
    //   const msg = await queryCurrentUser()
    //   return msg.data
    // } catch (error) {
    //   message.error(error.data.msg)
    //   history.push(loginPath)
    // }
    return undefined
  }
  const currentUser = await fetchUserInfo()
  return {
    currentUser,
  }
}

//渲染之前做权限校验，
// export function render(oldRender) {
//   oldRender()
// }
