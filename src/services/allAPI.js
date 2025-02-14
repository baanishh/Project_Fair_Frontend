import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverUrl";

//register API
export const registerAPI= async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/register`,reqBody)
}

//login API
export const loginAPI= async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/login`,reqBody)
}

//add project
export const addProjectAPI= async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/add-project`,reqBody,reqHeader)
}

//home project
export const homeProjectAPI= async()=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/home-projects`,{})
}

//user project
export const userProjectAPI= async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/user-projects`,{},reqHeader)
}

//all project
export const allProjectAPI= async(reqHeader,searchKey)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/all-projects?search=${searchKey}`,{},reqHeader)
}

//edit project
export const editProjectAPI= async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_BASE_URL}/project/${id}/edit`,reqBody,reqHeader)
}

//delete project
export const deleteProjectAPI= async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_BASE_URL}/project/${id}/remove`,{},reqHeader)
}

//edit user profile
export const editUserAPI= async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_BASE_URL}/user/edit`,reqBody,reqHeader)
}