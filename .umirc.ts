import routes from './config/routes'
import { defineConfig } from 'umi'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title: '同城蓝领家园',
  history: { type: 'browser' },
  // layout: {
  //   name: '同城蓝领家园', // 网站名字
  //   layout: 'top', // layout 的菜单模式， side: 左侧导航 top: 顶部导航 mix: 混合式导航
  //   navTheme: 'light', // 左侧导航的主题为 浅色 主题
  // },
  routes: routes,
  fastRefresh: {},
  define: {
    'process.env.ENV': 'dev',
    'process.env.API_ROOT': 'http://127.0.0.1:9001',
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:9001',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  extraPostCSSPlugins: [require('tailwindcss'), require('autoprefixer')],
})
