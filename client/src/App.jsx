import { useState } from 'react'
import './App.css'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from './pages/Home';
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn';
import About from './pages/About';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard'
function App() {

  return (
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/about' element={<About></About>}></Route>
      <Route path='/sign-in' element={<SignIn></SignIn>}></Route>
      <Route path='/sign-up' element={<SignUp></SignUp>}></Route>
      <Route path='projects' element={<Projects></Projects>}></Route>
      <Route path='dashboard' element={<Dashboard></Dashboard>}></Route>
    </Routes>
  )
}

export default App
