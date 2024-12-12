import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { deleteProjectAPI, userProjectAPI } from '../services/allAPI'
import { addProjectContext, editProjectContext } from '../context/ContextShare'


const View = () => {
  const {editResponse,setEditResponse}=useContext(editProjectContext)
    const {addResponse,setAddResponse}=useContext(addProjectContext)
    const [userProjects,setUserProjects]=useState([])
    console.log(userProjects);
    

    const getUserProjects=async()=>{
        const token=sessionStorage.getItem("token")
        if(token){
          const reqHeader={
            "Authorization" : `Bearer ${token}`
          }
          try {
            const result=await userProjectAPI(reqHeader)
            console.log(result);
            if(result.status==200){
                setUserProjects(result.data)
            }
            
          } catch (error) {
            console.log(error);
            
          }
        }
      }

      useEffect(()=>{
        getUserProjects()
      },[addResponse,editResponse])


      // delete project
      const removeProject=async(id)=>{
        const token=sessionStorage.getItem("token")
        if(token){
          const reqHeader={
            "Authorization":`Bearer ${token}`
          }
          try {
            const result=await deleteProjectAPI(id,reqHeader)
            if(result.status===200){
              getUserProjects()
            }
          } catch (error) {
            console.log(error);
          }
        }}


  return (
   <>
    <div className="d-flex justify-content-between my-3">
        <h2 className='text-warning'>All Projects</h2>
        <div><Add/></div>
    </div>
           {
            userProjects.length>0 ?
            userProjects.map(project=>(
                <div className="border rounded p-2 d-flex mb-3 justify-content-between">
                <h3>{project?.title}</h3>
                <div className="d-flex align-items-center">
                    <div><Edit project={project}/></div>
                    <button className='btn'><a href={project?.github} target='_blank' ><i className="fa-brands fa-github"></i></a></button>
                    <button className="btn" onClick={()=>removeProject(project._id)}><i className="fa-solid fa-trash text-danger"></i></button>
                </div>
            </div>
            )) : (
                <div className="fw-bolder fs-1">You not uploaded any projects yet !!</div>
            )
            }

   </>
   
  )
}

export default View