# micro-app demo

### 介绍

基于JD开源的micro-app微前端框架，同时使用ModuleFederation进行公共组件抽离

- root

基于vue2.6.11+webpack4.46.0的基座项目

- app1

使用vue-cli4生成的基于vue3.0+webpack5.73.0项目

- app2

使用create-react-app生成基于react18+webpack5.73.0项目

- app3

基于vite2.9.9+vue3.2.25项目

- app4

手动搭建的vue3.2.37+webpack5.73.0+typescript项目

- comp

基于webpack5.73+vue3.0.11的项目，公共组件，作为ModuleFederation的提供方

### 接入micro-app

> 基座应用和子应用都使用hash模式

> 子应用

修改src/main.js

- 添加mount和unmount方法
- 通过window.__MICRO_APP_ENVIRONMENT__判断是否处于微前端环境中
- window.microApp.addDataListener监听数据变化，以及对路由跳转进行处理

### 接入module federation

> comp项目为提供组件的host方
> 使用app1, app3分别作为webpack和vite的remote方消费host组件

### 接入问题

1. 由于当前vite无法作为host，被webpack消费，所以comp必须使用webpack。
2. 在使用过程中发现，micro-app子应用使用module federation会出现script load failed.

解决方案： ModuleFerderationPlugin导出时必须为umd或者system两种模式，由于不想引入system.js，故采用umd模式

```js
library: {
  type: 'umd',
  name: 'comp'
}
```

3. vite在使用过程中出现了问题，最后发现由于webpack默认导出整个模块，需要添加libraryExport属性，只导出指定模块，至此vite使用也成功。

```js
{
  output: {
    librayExport: 'default'
  }
}
```

### 本地开发

当有多个子项目时，启动多个项目会变得有些繁琐，可以通过在root项目添加.env.development.local文件，自定义配置，使用线上发布的代码

```js
VUE_APP_APP1=http://localhost:8001
VUE_APP_APP2=http://liuwenjian.cn:8002  // 线上地址
VUE_APP_APP3=http://localhost:8003
VUE_APP_APP4=http://localhost:8004
VUE_APP_COMP=http://localhost:8010
```

