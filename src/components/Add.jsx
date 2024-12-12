import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UploadImg from '../assets/uploadimg.jpeg'
import { addProjectAPI } from '../services/allAPI';
import { addProjectContext } from '../context/ContextShare';


const Add = () => {
  const {addResponse,setAddResponse}=useContext(addProjectContext)
  const [preview,setPreview]=useState("")
  const [uploadFileStatus,setUploadFileStatus]=useState(false)
  const [projectDetails,setProjectDetails]=useState({
    title:"", languages:"", overview:"", github:"", website:"", projectImage:""
    })
    console.log(projectDetails);
  
    const [show, setShow] = useState(false);
    
    useEffect(()=>{
      if(projectDetails.projectImage.type=='image/png' || projectDetails.projectImage.type=='image/png' || projectDetails.projectImage.type=='image/jpeg' ||projectDetails.projectImage.type=='image/jpg'){
        setUploadFileStatus(true)
        setPreview(URL.createObjectURL(projectDetails.projectImage))
      }else{
        setUploadFileStatus(false)
        setProjectDetails({...projectDetails,projectImage:""})
      }
    },[projectDetails.projectImage])

    const handleClose = () => {
      setShow(false)
      setPreview("")
      setUploadFileStatus("")
      setProjectDetails({
          title:"", languages:"", overview:"", github:"", website:"", projectImage:""
      })
    }
    const handleShow = () => setShow(true);

    //Add the Project
    const handleAddProject =async () =>{
      const {title , languages , overview , github , website , projectImage}=projectDetails
      if(title && languages && overview && github && website && projectImage){
        const reqBody=new FormData()
        reqBody.append('title',title)
        reqBody.append('languages',languages)
        reqBody.append('overview',overview)
        reqBody.append('github',github)
        reqBody.append('website',website)
        reqBody.append('projectImage',projectImage)

        const token=sessionStorage.getItem("token")
        if(token){
          const reqHeader={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          //make api call
          try {
            const result=await addProjectAPI(reqBody,reqHeader)
            console.log(result);
            if(result.status==200){
              alert("Project uploaded successfully")
              handleClose()
              //share result response via context api
              setAddResponse(result)
            }else{
              if(result.response.status==406){
                alert(result.response.data)
              }
            }
          } catch (error) {
            console.log(error);
          }
        }

      }else{
        alert("Please fill the form ")
      }
    }

  return (
    <>
    <button onClick={handleShow} className='btn btn-primary'>+ New Project</button>
    <Modal
        size='lg'
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row align-items-center">
            <div className="col-lg-4">
                <label className='mb-3'>
                    <input onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} type="file" style={{display:"none"}}/>
                    <img src={preview?preview:UploadImg} height={'200px'} className='img-fluid' alt="" />
                </label>
               {!uploadFileStatus &&
                <div className='text-warning font-bolder'>
                    *Upload Only following file types (jpeg,jpg,png) here!!!
                </div>}
            </div>
            <div className="col-lg-8">
                <div className="mb-2">
                    <input onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} value={projectDetails.title} type="text" className='form-control' placeholder='Project Title' />
                </div>
                <div className="mb-2">
                    <input onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})} value={projectDetails.languages} type="text" className='form-control' placeholder='Project Language' />
                </div>
                <div className="mb-2">
                    <input onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} value={projectDetails.overview}  type="text" className='form-control' placeholder='Project Overview' />
                </div>
                <div className="mb-2">
                    <input onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} value={projectDetails.github}  type="text" className='form-control' placeholder='Github Link' />
                </div>
                <div className="mb-2">
                    <input onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})} value={projectDetails.website}  type="text" className='form-control' placeholder='Project Website link' />
                </div>
            </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddProject}>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add