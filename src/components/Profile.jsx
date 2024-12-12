import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap';
import UploadProfile from '../assets/Upload.png'
import SERVER_BASE_URL from '../services/serverUrl';
import { editUserAPI } from '../services/allAPI';

const Profile = () => {
    const [open, setOpen] = useState(false);
    const [preview,setPreview]=useState('')
    const [userDetails,setUserDetails]=useState({
      username:"", email:"", password:"", github:"", linkedin:"", profilePic:"" 
    })
    const [existingProfilePic,setExistingProfilePic]=useState("")

    console.log("user details",userDetails);
    

    useEffect(()=>{
      if(sessionStorage.getItem("user")){
        const user=JSON.parse(sessionStorage.getItem("user"))
        setUserDetails({...userDetails,
          username:user.username, email:user.email, password:user.password, github:user.github, linkedin:user.linkedin
        })
        setExistingProfilePic(user.profilePic)
      }
    },[open])

    //render if uploaded profile pic
    useEffect(()=>{
      if (userDetails.profilePic) {
        setPreview(URL.createObjectURL(userDetails.profilePic))
      } else {
        setPreview("")
      }
    },[userDetails.profilePic])

    //update user profile
    const handleUpdate=async()=>{
      const {username, email, password, github, linkedin, profilePic}=userDetails
      if(github && linkedin){
        //req body
        const reqBody=new FormData()
        reqBody.append("username",username)
        reqBody.append("email",email)
        reqBody.append("password",password)
        reqBody.append("github",github)
        reqBody.append("linkedin",linkedin)
        preview?reqBody.append("profilePic",profilePic) : reqBody.append("profilePic",existingProfilePic)

        //reqHeader
        const token=sessionStorage.getItem("token")
        if(token){
          const reqHeader={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          //make api call
          try {
            const result=await editUserAPI(reqBody,reqHeader)
            if(result.status===200){
              alert("user profile updated successfully")
              sessionStorage.setItem("user",JSON.stringify(result.data))
              setOpen(!open)
            }
          } catch (error) {
            console.log(error);
          }
      }
    }else{
      alert("please fill the form completely")
    }
  }

  return (
    <>
    <div className="d-flex justify-content-evenly al">
        <h3 className='text-warning'>Profile</h3>
        <button className='btn btn-warning' onClick={()=>setOpen(!open)}> <i className="fa-solid fa-chevron-down"></i></button>
    </div>
    <Collapse in={open}>
        <div className='row container-fluid align-items-center justify-content-center shadow p-2 rounded' id="example-collapse-text">
            {/* upload image */}
            <label className='text-center'>
            <input type="file" style={{display:'none'}} onChange={e=>setUserDetails({...userDetails,profilePic:e.target.files[0]})}/>
          { existingProfilePic =="" ?
           <img width={'280px'} height={'280px'} className='rounded-circle' src={preview?preview:UploadProfile} alt="" />
            : 
          <img width={'280px'} height={'280px'} className='rounded-circle' src={preview?preview:`${SERVER_BASE_URL}/uploads/${existingProfilePic}`} alt="" />  
         }
            </label>
          <div className="mb-2 w-100">
            <input type="text" value={userDetails.github} onChange={(e)=>setUserDetails({...userDetails,github:e.target.value})} placeholder='user GITHUB Link' className='form-control'/>
          </div>
          <div className="mb-2 w-100">
            <input type="text" value={userDetails.linkedin} onChange={(e)=>setUserDetails({...userDetails,linkedin:e.target.value})} placeholder='user LINKEDIN Link' className='form-control'/>
          </div>
          <div className="d-grid w-100">
            <button className='btn btn-warning' onClick={handleUpdate}>Update</button>
          </div>
        </div>
      </Collapse>
    </>
  )
}

export default Profile