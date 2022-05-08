import { Effect, ImmerReducer, Reducer, Subscription } from 'umi'

export interface UserModelState {
  userinfo: { [key: string]: any }
  // name: string
}

export interface UserModelType {
  namespace: 'user'
  state: UserModelState
  effects: {
    query: Effect
  }
  reducers: {
    // save: Reducer<UserModelState>
    // 启用 immer 之后
    save: ImmerReducer<UserModelState>
  }
  subscriptions: { setup: Subscription }
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    userinfo: { a: 'aoao' },
    // name: 'aaa',
  },

  effects: {
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          })
        }
      })
    },
  },
}

export default UserModel
