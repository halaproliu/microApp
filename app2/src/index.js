import './public-path';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import Router from './router'
import reportWebVitals from './reportWebVitals';

// 与基座进行数据交互
function handleMicroData (router) {
  // 是否是微前端环境
  if (window.__MICRO_APP_ENVIRONMENT__) {
    // 主动获取基座下发的数据
    console.log('app2 getData:', window.microApp.getData())

    // 监听基座下发的数据变化
    window.microApp.addDataListener((data) => {
      console.log('app2 addDataListener:', data)
    })

    // 向基座发送数据
    setTimeout(() => {
      window.microApp.dispatch({ myname: 'app2' })
    }, 3000)
  }
}

let root
function mount() {
  root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  );
  handleMicroData()
}

function unmount() {
  root.unmount()
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_ENVIRONMENT__) {
  // @ts-ignore
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount }
} else {
  // 非微前端环境直接渲染
  mount();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
