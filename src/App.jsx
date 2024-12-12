import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import DashBoard from './pages/DashBoard'
import Projects from './pages/Projects'
import Pnf from './pages/Pnf'
import Footer from './components/Footer'
import {ProtectedRouteContext} from './context/ProtectedRoute'


const App = () => {
  const {authorizedUser,setAuthorizedUser}=useContext(ProtectedRouteContext)
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth isRegister={true}/>}/>
      { authorizedUser &&
        <>
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path='/projects' element={<Projects/>}/>
        </>
      }
      <Route path='/*' element={<Pnf/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App