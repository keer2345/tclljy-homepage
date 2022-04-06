import { PageLoading } from '@ant-design/pro-layout'
import { history } from 'umi'
import { currentUser as queryCurrentUser } from './services/login'

const loginPath = '/login'

// export const initialStateConfig = {
//   loading: <PageLoading />,
// }

export async function getInitialState() {
  console.log('app.ts')
  const fetchUserInfo = async () => {
    console.log('ddd')
    try {
      const msg = await queryCurrentUser()
      console.log('aaa')
      return msg.data
    } catch (error) {
      console.log('bbb')
      console.log('error', error.data)
      history.push(loginPath)
    }
    return undefined
  }
  console.log('ccc')
  const currentUser = await fetchUserInfo()
  return {
    fetchUserInfo,
    currentUser,
  }
}

//渲染之前做权限校验，
// export function render(oldRender) {
//   oldRender()
// }
