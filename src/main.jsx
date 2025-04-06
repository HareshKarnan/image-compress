import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { HashRouter } from 'react-router-dom';

const rootElement = document.getElementById('root')
console.log('Root element found:', rootElement)

try {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <HashRouter basename="/image-compress/">
        <App />
      </HashRouter>
    </React.StrictMode>
  )
} catch (error) {
  console.error('Error rendering app:', error)
}