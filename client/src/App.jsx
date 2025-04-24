
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages.jsx/Login'
import Register from './pages.jsx/Register'
import Home from './pages.jsx/Home'
import { useEffect, useState } from 'react'

function App() {
  const [isAuthorized,setIsAuthorized]=useState(false)
  useEffect(()=>{
      if(sessionStorage.getItem("token")){
          setIsAuthorized(true)
      }else{
          setIsAuthorized(false)
      }
  },[])
  return (
    <>
      <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='/login' element={<Login />} />
        { isAuthorized &&
          <Route path='/home' element={<Home />} />}
        <Route path='/*' element={<Login/>}></Route>
      </Routes>
    </>
  )
}

export default App
