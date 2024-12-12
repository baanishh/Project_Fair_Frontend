import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className=" text-white py-4">
    <Container>
      <Row>
        {/* Brand Name */}
        <Col md={3}>
        <div className='d-flex' style={{alignItems:"center"}}><i className="fa-solid fa-music me-2"></i> <h5>Project fair</h5></div>
        
          <p>© 2024 Brand Name</p>
        </Col>

        {/* Column 1 */}
        <Col md={3}>
          <h5>CONTACTS</h5>
          <ul className="list-unstyled">
            <li><a href="#link1" className="text-white">Link 1</a></li>
            <li><a href="#link2" className="text-white">Link 2</a></li>
            <li><a href="#link3" className="text-white">Link 3</a></li>
          </ul>
        </Col>

        {/* Column 2 */}
        <Col md={3}>
          <h5>GUIDES</h5>
          <ul className="list-unstyled" style={{color:"white"}}>
            <li ><a href="#link4" className="text-white">Link 4</a></li>
            <li><a href="#link5" className="text-white">Link 5</a></li>
            <li><a href="#link6" className="text-white">Link 6</a></li>
          </ul>
        </Col>

        {/* Column 3 */}
        <Col md={3}>
          <h5>LINKS</h5>
          <ul className="list-unstyled">
          <li><Link to={'/'} style={{textDecoration:'none'}} className='text-white'>Landing Page</Link></li>
         <li><Link to={'/home'} style={{textDecoration:'none'}} className='text-white'>Home Page</Link></li> 
          <li><Link to={'/history'} style={{textDecoration:'none'}} className='text-white'>History Page</Link></li>
          </ul>
        </Col>
      </Row>
    </Container>
  </footer>
  )
}

export default Footer