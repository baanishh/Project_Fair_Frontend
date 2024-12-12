import React, { createContext, useEffect, useState } from 'react'

export const ProtectedRouteContext=createContext()

const ProtectedRoute = ({children}) => {

    const [authorizedUser,setAuthorizedUser]=useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setAuthorizedUser(true)
        }else{
            setAuthorizedUser(false)
        }
    },[authorizedUser])

  return (
    <ProtectedRouteContext.Provider value={{authorizedUser,setAuthorizedUser}}>
    {children}
    </ProtectedRouteContext.Provider>
  )
}

export default ProtectedRoute