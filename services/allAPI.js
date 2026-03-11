import { serverURL } from "./serverURL"
import commonAPI from "./commonAPI"


// ADMIN LOGIN

export const adminLoginAPI = async (reqBody) => {

    return await commonAPI(
        "POST",
        `${serverURL}/api/login`,
        reqBody,
        {}
    )

}
// CREATE BLOG

export const createBlogAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${serverURL}/api/createblog`,
    reqBody,
    reqHeader
  )
}

// LIST BLOGS
export const listBlogsAPI = async () => {
  return await commonAPI(
    "GET",
    `${serverURL}/api/list`,
    "",
    {}
  )
}

// DELETE BLOG
export const deleteBlogAPI = async (id, reqHeader) => {
  return await commonAPI(
    "DELETE",
    `${serverURL}/api/delete/${id}`,
    {},
    reqHeader
  )
}

// VIEW BLOG
export const viewBlogAPI = async (id) => {
  return await commonAPI(
    "GET",
    `${serverURL}/api/view/${id}`,
  {},
    {}
  )
}

// EDIT BLOG
export const editBlogAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${serverURL}/api/edit/${id}`,
    reqBody,
    reqHeader
  )
}


//Menu




// ADD MENU
export const createMenuAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${serverURL}/api/addmenu`,
    reqBody,
    reqHeader
  )
}


// GET MENU
export const listMenuAPI = async () => {
  return await commonAPI(
    "GET",
    `${serverURL}/api/getmenu`,
    {},
    {}
  )
}

export const viewMenuAPI = async (id, reqHeader) => {
  return await commonAPI(
    "GET",
    `${serverURL}/api/getmenu/${id}`,
    {},
    reqHeader
  )
}

export const editMenuAPI = async (id,reqBody,reqHeader) => {
  return await commonAPI(
    "PUT",
    `${serverURL}/api/editmenu/${id}`,
    reqBody,
    reqHeader
  )
}



// DELETE MENU
export const deleteMenuAPI = async (id, reqHeader) => {
  return await commonAPI(
    "DELETE",
    `${serverURL}/api/deletemenu/${id}`,
    {},
    reqHeader
  )
}



//opening hours


export const createOpeningAPI = async (reqBody,reqHeader)=>{
  return await commonAPI(
    "POST",
    `${serverURL}/api/createopening-hours`,
    reqBody,
    reqHeader
  )
}

export const getOpeningAPI = async ()=>{
  return await commonAPI(
    "GET",
    `${serverURL}/api/getopening-hours`
  )
}

export const updateOpeningAPI = async (reqBody,reqHeader)=>{
  return await commonAPI(
    "PUT",
    `${serverURL}/api/opening-hours`,
    reqBody,
    reqHeader
  )
}


//special day

export const createSpecialAPI = async (reqBody,reqHeader)=>{
  return await commonAPI(
    "POST",
    `${serverURL}/api/special-hours`,
    reqBody,
    reqHeader
  )
}

export const getSpecialAPI = async ()=>{
  return await commonAPI(
    "GET",
    `${serverURL}/api/getspecial-hours`
  )
}