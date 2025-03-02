import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header.jsx'
import FooterComp from './components/Footer.jsx'
import { store,persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeProvider from './components/themeProvider.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
  <Provider store={store}>
  <ThemeProvider>
  <BrowserRouter>
  <ScrollToTop></ScrollToTop>
    <Header></Header>
    <App />
    <FooterComp></FooterComp>
  </BrowserRouter>
  </ThemeProvider>
  </Provider></PersistGate>
)
