import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header.jsx'
import FooterComp from './components/Footer.jsx'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
    <Header></Header>
    <App />
    <FooterComp></FooterComp>
  </BrowserRouter>
  </Provider>
)
