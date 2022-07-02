
// 开发环境地址
let config = {
  app1: 'http://localhost:8001',
  app2: 'http://localhost:8002',
  app3: 'http://localhost:8003',
  app4: 'http://localhost:8004'
}

// 线上环境地址
if (process.env.NODE_ENV === 'production') {
  // 基座应用和子应用部署在同一个域名下，这里使用location.origin进行补全
  // Object.keys(config).forEach((key) => {
  //   config[key] = window.location.origin
  // })
  config = {
    app1: 'http://liuwenjian.cn:8001',
    app2: 'http://liuwenjian.cn:8002',
    app3: 'http://liuwenjian.cn:8003',
    app4: 'http://liuwenjian.cn:8004'
  }
}


export default config
