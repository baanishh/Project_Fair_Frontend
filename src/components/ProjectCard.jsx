import React, { useState } from 'react'
import { Card, Modal } from "react-bootstrap";
import SERVER_BASE_URL from '../services/serverUrl';

const ProjectCard = ({projects}) => {
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  return (
    <>
    <Card onClick={handleShow} className='btn shadow'>
      <Card.Img height={'200px'} variant="top" src={`${SERVER_BASE_URL}/uploads/${projects?.projectImage}`} />
      <Card.Body>
        <Card.Title>{projects?.title}</Card.Title>
      </Card.Body>
    </Card>

    <Modal size='lg' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{projects?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
          <div className="col-lg-6">
            <img className='img-fluid' src={`${SERVER_BASE_URL}/uploads/${projects?.projectImage}`} alt="" />
          </div>
          <div className="col-lg-6">
            <h3>{projects?.title}</h3>
            <h6>Language used : <span className='text-danger'>{projects?.languages}</span></h6>
            <p style={{textAlign:'justify'}}> <span className='font-bolder'>Project Overview : {projects?.overview}</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, harum.</p>
          </div>
        </div>
        <div className='mt-2 float-start'>
        <a href={projects?.github} target='_blank' className='btn btn-secondary me-2'> <i className="fa-brands fa-github"></i></a>
        <a href={projects?.website} target='_blank' className='btn btn-primary'> <i className="fa-solid fa-link"></i></a>
        </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCard