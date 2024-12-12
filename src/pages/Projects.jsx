import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectAPI } from '../services/allAPI'

const Projects = () => {
  const [allProjects,setAllProjects]=useState([])
  const [searchKey,setSearchKey]=useState("")

  useEffect(()=>{
    getAllProjects()
  },[searchKey])

  const getAllProjects=async()=>{
    const token=sessionStorage.getItem("token")
    if(token){
      const reqHeader={
        "Authorization" : `Bearer ${token}`
      }
      try {
        const result=await allProjectAPI(reqHeader,searchKey)
        console.log(result);
        if(result.status==200){
          setAllProjects(result.data)
        }
        
      } catch (error) {
        console.log(error);
        
      }
    }
  }
  return (
    <>
    <Header/>
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center py-5">
        <h1>All Projects</h1>
        <input onChange={e=>setSearchKey(e.target.value)} type="text" placeholder='Search products by their language' className='form-control w-25' />
      </div>
     <Row>
     { allProjects.length>0?
      allProjects?.map(project=>(
        <Col className='mb-5' sm={12} lg={4} md={6}>
        <ProjectCard projects={project}/>
      </Col>
      ))
      :
      <div className="fw-bolder text-danger">No Projects found !!!</div>
      }
     </Row>
    </div>
    </>
  )
}

export default Projects