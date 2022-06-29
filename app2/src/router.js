// router.js
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './views/Home'

export default function AppRoute () {
  return (
    // 👇 设置基础路由，如果没有设置baseroute属性，则window.__MICRO_APP_BASE_ROUTE__为空字符串
    <BrowserRouter basename={window.__MICRO_APP_BASE_ROUTE__ || '/'}>
      <Routes>
        <Route path="*" element={<App/>}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
