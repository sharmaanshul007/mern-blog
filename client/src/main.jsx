import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header.jsx'
import FooterComp from './components/Footer.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <Header></Header>
    <App />
    <FooterComp></FooterComp>
  </StrictMode>
  </BrowserRouter>
)
