'use client'

import { useEffect, useState } from "react"
import { Paper, Typography, Button, TextField, Box } from "@mui/material"
import { useParams, useRouter } from "next/navigation"
import { viewBlogAPI, editBlogAPI } from "@/services/allAPI"
import { serverURL } from "@/services/serverURL"

export default function BlogDetails(){

  const { id } = useParams()
  const router = useRouter()

  const [blog,setBlog] = useState(null)
  const [editMode,setEditMode] = useState(false)

  const [title,setTitle] = useState("")
  const [content,setContent] = useState("")
  const [image,setImage] = useState(null)

  const fetchBlog = async ()=>{

    const result = await viewBlogAPI(id)

    if(result.status === 200){
      const data = result.data.blog
      setBlog(data)
      setTitle(data.title)
      setContent(data.content)
    }

  }

  useEffect(()=>{
    fetchBlog()
  },[])

  const handleUpdate = async ()=>{

    const token = localStorage.getItem("adminToken")

    const reqHeader = {
      Authorization:`Bearer ${token}`
    }

    const reqBody = new FormData()

    reqBody.append("title",title)
    reqBody.append("content",content)

    if(image){
      reqBody.append("image",image)
    }

    const result = await editBlogAPI(id,reqBody,reqHeader)

    if(result.status === 200){
      alert("Blog updated successfully")
      setEditMode(false)
      fetchBlog()
    }

  }

  if(!blog){
    return <Typography>Loading...</Typography>
  }

  return(

    <Paper sx={{p:4}}>

      {!editMode ? (

        <>
          <Typography variant="h4" mb={2}>
            {blog.title}
          </Typography>

          {blog.image && (
            <Box mb={3}>
              <img
                src={`${serverURL}/uploads/${blog.image}`}
                style={{
                  width:"50%",
                  maxHeight:"400px",
                  objectFit:"cover",
                  borderRadius:"8px"
                }}
              />
            </Box>
          )}

          <Typography mb={2}>
            {new Date(blog.date).toLocaleDateString()}
          </Typography>

          <Typography mb={3}>
            {blog.content}
          </Typography>

          <Button
            variant="contained"
            onClick={()=>setEditMode(true)}
          >
            Edit Blog
          </Button>

        </>

      ) : (

        <>
          <Typography variant="h5" mb={2}>
            Edit Blog
          </Typography>

          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />

          <TextField
            label="Content"
            multiline
            rows={6}
            fullWidth
            margin="normal"
            value={content}
            onChange={(e)=>setContent(e.target.value)}
          />

          <input
            type="file"
            onChange={(e)=>setImage(e.target.files[0])}
          />

          <Box mt={2}>
            <Button
              variant="contained"
              onClick={handleUpdate}
            >
              Update
            </Button>

            <Button
              sx={{ml:2}}
              onClick={()=>setEditMode(false)}
            >
              Cancel
            </Button>
          </Box>

        </>

      )}

    </Paper>
  )
}