import { useState } from 'react'
import './App.css'
import {Route,Routes} from "react-router-dom"
import CreatePost from './pages/createPost';
import Home from './pages/Home';
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn';
import About from './pages/About';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import Search from './pages/Search';
function App() {

  return (
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/about' element={<About></About>}></Route>
      <Route path='/sign-in' element={<SignIn></SignIn>}></Route>
      <Route path='/sign-up' element={<SignUp></SignUp>}></Route>
      <Route path='/projects' element={<Projects></Projects>}></Route>
      <Route path='/search' element={<Search></Search>}></Route>
      <Route element= {<PrivateRoute></PrivateRoute>}>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      </Route>
      <Route element={<OnlyAdminPrivateRoute></OnlyAdminPrivateRoute>}>
        <Route path='/create-post' element={<CreatePost></CreatePost>}></Route>
        <Route path='/update-post/:postId' element={<UpdatePost></UpdatePost>}></Route>
      </Route>
      <Route path='/post/:postSlug' element= {<PostPage></PostPage>}></Route>
    </Routes>
  )
}

export default App
