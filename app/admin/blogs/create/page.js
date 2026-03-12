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

const handleSubmit = async () => {

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
        onChange={(e)=>setTitle(e.target.value)}
      />

      <TextField
        label="Content"
        multiline
        rows={6}
        fullWidth
        margin="normal"
        onChange={(e)=>setContent(e.target.value)}
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