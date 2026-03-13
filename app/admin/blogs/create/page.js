'use client'

import { useState } from "react"
import { TextField, Button, Paper, Typography } from "@mui/material"
import { createBlogAPI } from "@/services/allAPI"
import { useRouter } from "next/navigation"

export default function CreateBlog(){

  const router = useRouter()

  const [title,setTitle] = useState("")
  const [content,setContent] = useState("")
  const [image,setImage] = useState(null)
  const [errors,setErrors] = useState({})

const handleSubmit = async () => {
  setErrors({})

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

  const result = await createBlogAPI(reqBody,reqHeader)

  console.log(result)

  if(result.status===201){
    router.push("/admin/blogs")
  } else {
    if(result.data && typeof result.data === "object" && result.data.error){
      alert(result.data.error)
    } else if(result.data && typeof result.data === "object"){
      setErrors(result.data)
    } else {
      alert(result.data || "Error creating blog")
    }
  }
}

  return(

    <Paper sx={{p:3}}>

      <Typography variant="h5" mb={2}>
        Create Blog
      </Typography>

      <TextField
        label="Title"
        fullWidth
        margin="normal"
        onChange={(e)=>{
          setTitle(e.target.value)
          if(errors.title) setErrors(prev=>({...prev,title:""}))
        }}
        error={Boolean(errors.title)}
        helperText={errors.title}
      />

      <TextField
        label="Content"
        multiline
        rows={6}
        fullWidth
        margin="normal"
        onChange={(e)=>{
          setContent(e.target.value)
          if(errors.content) setErrors(prev=>({...prev,content:""}))
        }}
        error={Boolean(errors.content)}
        helperText={errors.content}
      />

      <input
        type="file"
        onChange={(e)=>setImage(e.target.files[0])}
      />

      <Button
        variant="contained"
        sx={{mt:2}}
        onClick={handleSubmit}
      >
        Create
      </Button>

    </Paper>

  )
}