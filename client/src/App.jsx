
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages.jsx/Login'
import Register from './pages.jsx/Register'
import Home from './pages.jsx/Home'
import ProtectedRoutes from './contexts/ProtectedRoutes'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='/login' element={<Login />} />
        
         <ProtectedRoutes> <Route path='/home' element={<Home />} /></ProtectedRoutes>
        <Route path='/*' element={<Login/>}></Route>
      </Routes>
    </>
  )
}

export default App
