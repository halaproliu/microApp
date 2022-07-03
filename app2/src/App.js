// import logo from './logo.svg';
import { useEffect, useState } from 'react'
import './App.css';

function randomColor() {
  return `#${Math.random().toString(16).slice(2, 8)}`
}

function App() {
  const [styles, setStyles] = useState([])
  useEffect(() => {
    let currStyle = document.styleSheets[0]
    console.log(currStyle);
    let token = window.WebKitCSSKeyframesRule ? '-webkit-' : ''
    let baseMove = 600
    for (let i = 0; i < 20; i++) {
      let randomWH = Math.floor(Math.random() * 100)
      let top = Math.floor(Math.random() * baseMove)
      let left = Math.floor(Math.random() * baseMove)
      let moveTop = Math.floor(Math.random() * baseMove)
      let moveLeft = Math.floor(Math.random() * baseMove)
      currStyle.insertRule(`@${token}keyframes moveX${i} { 0% { left: ${left}px;} 100% { left: ${moveLeft}px; } }`);
      currStyle.insertRule(`@${token}keyframes moveY${i} { 0% { top: ${top}px;} 100% { top: ${moveTop}px; } }`);
      let style = {
        backgroundColor: randomColor(),
        width: `${randomWH}px`,
        height: `${randomWH}px`,
        animation: `moveX${i} 4s cubic-bezier(0.36,0,0.64,1) -2s infinite alternate, moveY${i} 4s cubic-bezier(0.36,0,0.64,1) 0s infinite alternate`
      }
      setStyles((styles) => [...styles, style])
    }
  }, [setStyles])
  return (
    <div className="App">
      {
        styles.map((style, index) => (<div className="circle" style={style} key={index}></div>))
      }
    </div>
  );
}

export default App;
