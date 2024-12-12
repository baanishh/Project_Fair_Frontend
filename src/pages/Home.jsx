import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LandingPage from "../assets/download.jpeg";
import ProjectCard from "../components/ProjectCard";
import { Card } from "react-bootstrap";
import { homeProjectAPI } from "../services/allAPI";

const Home = () => {
  const [homeProjects,setHomeProjects]=useState([])
  const navigate=useNavigate()

  const [isLogin,setIsLogin]=useState(false)

  useEffect(()=>{
    getHomeProjects()
    if(sessionStorage.getItem("token")){
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  },[])

  const getHomeProjects=async()=>{
    try {
      const result=await homeProjectAPI()
      console.log(result);
      if(result.status==200){
        setHomeProjects(result.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log("projects",homeProjects);


  const handleNavigate=()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }else{
      alert("please login")
    }
  }

  return (
    <>
      {/* landing page */}
      <div
        style={{ minHeight: "100vh" }}
        className="d-flex justify-content-center align-items-center rounded shadow w-100 py-5"
      >
        <div className="container ">
          <div className="row align-item-center">
            <div className="col-lg-6">
              <h1 style={{ fontSize: "80px" }}>
                <i className="fa-brands fa-docker"></i> Project Fair
              </h1>
              <p style={{ textAlign: "justify" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
             {isLogin ?
              <Link to={"/dashboard"} className="btn btn-primary">
                MANAGE YOUR PROJECTS
              </Link>
            :
            <Link to={"/login"} className="btn btn-primary">
            START TO EXPLORE
            </Link>  
            }
            </div>
            <div className="col-lg-6">
              <img
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                className="img-fluid"
                src={LandingPage}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* explore projects */}
      <div className="my-5 text-center">
        <h1 className="mb-5">Explore Our Projects</h1>
        <marquee behavior="" direction="">
          <div className="d-flex">
           {homeProjects?.map(projects=>(
            <div className="me-5">
             <ProjectCard projects={projects} />
            </div>
           ))}
          </div>
        </marquee>
        <div onClick={handleNavigate} className="btn btn-link mt-5">
          CLICK HERE TO VIEW MORE PROJECTS
        </div>
      </div>

      {/* testimonial */}
      <div className="d-flex justify-center align-items-center my-5 flex-column">
        <h1>Our Testimonial</h1>
        <div className="d-flex justify-content-evenly align-items-center mt-3 w-100">
          {/* card one*/}
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Text className="d-flex justify-content-center align-items-center flex-column">
                <img
                  width={"60px"}
                  height={"60px"}
                  className="rounded-circle img-fluid "
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
                  alt=""
                />
                <div className="d-flex justify-content-center-my-2">
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                </div>
                <p style={{ textAlign: "justify" }}>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
            {/* card two */}
            <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Text className="d-flex justify-content-center align-items-center flex-column">
                <img
                  width={"60px"}
                  height={"60px"}
                  className="rounded-circle img-fluid "
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
                  alt=""
                />
                <div className="d-flex justify-content-center-my-2">
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                </div>
                <p style={{ textAlign: "justify" }}>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
            {/* card three*/}
            <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Text className="d-flex justify-content-center align-items-center flex-column">
                <img
                  width={"60px"}
                  height={"60px"}
                  className="rounded-circle img-fluid "
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
                  alt=""
                />
                <div className="d-flex justify-content-center-my-2">
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                </div>
                <p style={{ textAlign: "justify" }}>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Home;
