import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import {ProtectedRouteContext} from '../context/ProtectedRoute'

const Header = ({insideHeader}) => {
  const {authorizedUser,setAuthorizedUser}=useContext(ProtectedRouteContext)
  const navigate=useNavigate()

  const logout=()=>{
    sessionStorage.clear()
    setAuthorizedUser(false) //protected route
    navigate('/')
  }

  return (
    <Navbar style={{zIndex:1}} className="shadow border rounded position-fixed w-100">
        <Container>
          <Navbar.Brand href="#home">
           <Link to={'/'} className='text-decoration-none fw-bolder'> <i className="fa-brand fa-docker"></i>Project fair</Link>
          </Navbar.Brand>
          {
            insideHeader &&
            <button className='btn btn-link fw-bolder' onClick={logout}>Logout <i className="fa-solid fa-right-from-bracket ms-1"></i></button>
          }
        </Container>
      </Navbar>
  )
}

export default Header