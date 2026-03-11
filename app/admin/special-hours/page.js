'use client'

import { useEffect, useState } from "react"
import { Paper, Typography, TextField, Button, Box } from "@mui/material"
import { createSpecialAPI, getSpecialAPI } from "@/services/allAPI"

export default function SpecialHours(){

  const [date,setDate] = useState("")
  const [open,setOpen] = useState("")
  const [close,setClose] = useState("")
  const [note,setNote] = useState("")

  const [special,setSpecial] = useState([])

  const fetchSpecial = async ()=>{

    const result = await getSpecialAPI()

    if(result.status === 200){
      setSpecial(result.data)
    }

  }

  useEffect(()=>{
    fetchSpecial()
  },[])

  const handleSubmit = async ()=>{

    const token = localStorage.getItem("adminToken")

    const reqHeader = {
      Authorization:`Bearer ${token}`
    }

    const reqBody = {
      date,
      open,
      close,
      note,
      isClosed:false
    }

    const result = await createSpecialAPI(reqBody,reqHeader)

    if(result.status === 201){
      alert("Special hours added")
      fetchSpecial()
    }

  }

  return(

    <Paper sx={{p:4}}>

      <Typography variant="h5" mb={3}>
        Special Hours
      </Typography>

      <Box sx={{display:"flex",gap:2,mb:3}}>

        <TextField
          type="date"
          onChange={(e)=>setDate(e.target.value)}
        />

        <TextField
          type="time"
          onChange={(e)=>setOpen(e.target.value)}
        />

        <TextField
          type="time"
          onChange={(e)=>setClose(e.target.value)}
        />

        <TextField
          label="Note"
          onChange={(e)=>setNote(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Add
        </Button>

      </Box>

      {special.map((s)=>(

        <Box key={s._id} sx={{mb:2}}>

          <Typography>
            {new Date(s.date).toDateString()} :
            {s.isClosed ? " Closed" : ` ${s.open} - ${s.close}`}
            {s.note && ` (${s.note})`}
          </Typography>

        </Box>

      ))}

    </Paper>

  )
}