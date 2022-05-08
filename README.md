# umi project

## Getting Started
- [umijs+dva](https://chengsong.info/2021/11/19/umijs+dva%E7%AE%80%E5%8D%95%E5%AD%A6%E4%B9%A0/)

### Dva
- [12 步 30 分钟，完成用户管理的 CURD 应用](https://github.com/sorrycc/blog/issues/18)

## tailwindcss
- [UmiJS 配置 Tailwind CSS](https://zhuanlan.zhihu.com/p/489410215)
# 参考
- [llgtfoo/react-tpl-umi](https://github.com/llgtfoo/react-tpl-umi)
- [cgxgg11/umi-manage](https://github.com/cgxgg11/umi-manage)
- [PacktPublishing/Enterprise-React-Development-with-UmiJs](https://github.com/PacktPublishing/Enterprise-React-Development-with-UmiJs)

## Deploy
```sh
rm -rf dist dist.tar.gz

yarn build
tar -zcf dist.tar.gz dist
scp dist.tar.gz tclljy@175.24.126.5:/home/tclljy/tclljy-homepage
```