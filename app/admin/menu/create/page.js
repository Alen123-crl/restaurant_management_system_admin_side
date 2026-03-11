'use client'

import { useState } from "react"
import { Paper, TextField, Button, Typography } from "@mui/material"
import { createMenuAPI } from "@/services/allAPI"
import { useRouter } from "next/navigation"

export default function CreateMenu(){

  const router = useRouter()

  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState("")
  const [category,setCategory] = useState("")
  const [image,setImage] = useState(null)

  const handleSubmit = async ()=>{

    const token = localStorage.getItem("adminToken")

    const reqHeader = {
      Authorization:`Bearer ${token}`
    }

    const reqBody = new FormData()

    reqBody.append("name",name)
    reqBody.append("description",description)
    reqBody.append("price",price)
    reqBody.append("category",category)

    if(image){
      reqBody.append("image",image)
    }

    const result = await createMenuAPI(reqBody,reqHeader)

    if(result.status === 200){
      router.push("/admin/menu")
    }

  }

  return(

    <Paper sx={{p:3}}>

      <Typography variant="h5" mb={2}>
        Add Menu Item
      </Typography>

      <TextField label="Name" fullWidth margin="normal"
        onChange={(e)=>setName(e.target.value)}
      />

      <TextField label="Description" fullWidth margin="normal"
        onChange={(e)=>setDescription(e.target.value)}
      />

      <TextField label="Price" fullWidth margin="normal"
        onChange={(e)=>setPrice(e.target.value)}
      />

      <TextField label="Category" fullWidth margin="normal"
        onChange={(e)=>setCategory(e.target.value)}
      />

      <input type="file"
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