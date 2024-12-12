import React, { useContext, useState } from "react";
import authImg from "../assets/download.jpeg";
import { FloatingLabel, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../services/allAPI";
import {ProtectedRouteContext} from "../context/ProtectedRoute";


const Auth = ({ isRegister }) => {

  const {authorizedUser,setAuthorizedUser}=useContext(ProtectedRouteContext)

  const [isLogin,setIsLogin]=useState(false)
  const navigate=useNavigate()
  const [userInput,setUserInput]=useState({
    username:"",
    email:"",
    password:""
  })
  console.log(userInput);

  //register
  const register=async(e)=>{
    e.preventDefault()
    if (userInput.username && userInput.email && userInput.password) {
      //api call
      try {
        const result=await registerAPI(userInput)
        if (result.status==200) {
          console.log("check",result);
          
          alert(`welcome ${result.data?.username}, please login to explore our project`)
          navigate('/login')
          setUserInput({
            username:"",
            email:"",
            password:""
          })
        } else {
         if(result.status==406){
          alert(result.response.data)
          setUserInput({
            username:"",
            email:"",
            password:""
          })
         }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please Fill the Form")
    }
  }

  //login
  const login=async(e)=>{
    e.preventDefault()
    if (userInput.password && userInput.email) {
      try {
        const result=await loginAPI(userInput)
        if (result.status==200) {
          sessionStorage.setItem('user',JSON.stringify(result.data.user))
          sessionStorage.setItem('token',result.data.token)
          setIsLogin(true)
          setAuthorizedUser(true) //protected route
          setTimeout(()=>{
            navigate('/')
            setUserInput({username:"",email:"",password:""})
          },2000)
        } else {
          if(result.response.status==404){
            alert(result.response.data)
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please fill the form completely")
    }
  }

  return (
    <div
      style={{ minHeight: "100vh", width: "100%" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="container w-75">
        <div className="card shadow p-2">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img src={authImg} className="img-fluid" alt="" />
            </div>
            <div className="col-lg-6">
              <h1 className="my-2">
                {" "}
                <i className="fa-brands fa-docker"></i>Project Fair
              </h1>
              <h5>Sign {isRegister ? "Up" : "In"} to your Account</h5>
              <Form>
                {
                  isRegister && 
                  <FloatingLabel
                  controlId="floatingInputUsername"
                  label="User Name"
                  className="mb-3"
                >
                  <Form.Control type="text" placeholder="username" onChange={(e)=>setUserInput({...userInput,username:e.target.value})} value={userInput.username}/>
                </FloatingLabel>
                }
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control type="email" placeholder="name@example.com" onChange={(e)=>setUserInput({...userInput,email:e.target.value})} value={userInput.email} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control type="password" placeholder="Password" onChange={(e)=>setUserInput({...userInput,password:e.target.value})} value={userInput.password}/>
                </FloatingLabel>
                {
                  isRegister?
                  <div className="mt-3">
                    <button className="btn btn-primary mb-2" onClick={register}>Register</button>
                    <p>Existing User ? Please Click Here <Link to={'/login'}>Login</Link></p>
                  </div>
                  :
                  <div className="mt-3">
                    <button className="btn btn-primary mb-2" onClick={login}>Login
                   {isLogin && <Spinner animation="border" variant="warning" className="ms-1"/>}
                    </button>
                    <p>New User ? Please Click Here <Link to={'/register'}>Register</Link></p>
                  </div>
                }
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
