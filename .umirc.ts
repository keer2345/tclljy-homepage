import routes from './config/routes'
import { defineConfig } from 'umi'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title: '同城蓝领家园',
  history: { type: 'browser' },
  routes: routes,
  fastRefresh: {},
})
