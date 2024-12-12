import React, { createContext, useState } from 'react'

export const addProjectContext=createContext()
export const editProjectContext=createContext()

const ContextShare = ({children}) => {
    
    const [addResponse,setAddResponse]=useState("")
    const [editResponse,setEditResponse]=useState("")

  return (
    <addProjectContext.Provider value={{addResponse,setAddResponse}}>
        <editProjectContext.Provider value={{editResponse,setEditResponse}}>
        {children}
        </editProjectContext.Provider>
    </addProjectContext.Provider>
  )
}

export default ContextShare