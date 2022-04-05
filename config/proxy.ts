export default {
  '/api': {
    target: 'http://127.0.0.1:9001',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
}
