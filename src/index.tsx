// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import './main.scss'

window.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById('root') as HTMLElement)
  root.render(<App />)
})
