import { Effect, ImmerReducer, Reducer, Subscription } from 'umi'

const UserModel = {
  namespace: 'userinfo',
  state: {
    name: '',
  },

  effects: {
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    save(state, action) {
      const data = [
        {
          key: '1',
          name: 'Aaa',
          age: 32,
          address: 'aaa add',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Bbb',
          age: 54,
          address: 'Bbb add',
          tags: ['loser'],
        },
      ]
      return data
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

// export default UserModel
