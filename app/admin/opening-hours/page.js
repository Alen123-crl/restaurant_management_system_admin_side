'use client'

import { useEffect, useState } from "react"
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem
} from "@mui/material"

import {
  createOpeningAPI,
  updateOpeningAPI,
  getOpeningAPI
} from "@/services/allAPI"

export default function OpeningHours(){

  const daysList=[
    "Monday","Tuesday","Wednesday",
    "Thursday","Friday","Saturday","Sunday"
  ]

  const [hours,setHours] = useState([])
  const [shopClosed,setShopClosed] = useState(false)
  const [isEdit,setIsEdit] = useState(false)

  useEffect(()=>{
    fetchHours()
  },[])

  const fetchHours = async ()=>{

    const result = await getOpeningAPI()

    if(result.status===200 && result.data.length>0){

      setHours(result.data)
      setIsEdit(true)

    }

  }

  const handleChange=(index,field,value)=>{

    const updated=[...hours]
    updated[index][field]=value
    setHours(updated)

  }

  const addDay=()=>{

    if(hours.length>=7) return

    setHours([
      ...hours,
      { day:"", open:"09:00", close:"22:00", isOpen:true }
    ])

  }

  const handleSave=async()=>{

    const token = localStorage.getItem("adminToken")

    const reqHeader={
      Authorization:`Bearer ${token}`
    }

    let result

    if(isEdit){

      result = await updateOpeningAPI(hours,reqHeader)

    }else{

      result = await createOpeningAPI(hours,reqHeader)

    }

    if(result.status===200 || result.status===201){
      alert("Opening hours saved")
    }

  }

  return(

    <Paper
      sx={{
        p:4,
        minHeight:"100vh",
        background:"#f4f6f8"
      }}
    >

      <Typography variant="h5" fontWeight="bold" mb={3} sx={{ fontWeight: 'bold' }}>
        Opening Days
      </Typography>

      {/* Shop Closed */}

      <FormControlLabel
        control={
          <Checkbox
            checked={shopClosed}
            onChange={(e)=>setShopClosed(e.target.checked)}
          />
        }
        label="Shop is Closed"
      />

      {/* Add Day */}

      <Box mt={2} mb={3}>
        <Button
          variant="outlined"
          onClick={addDay}
          disabled={hours.length===7}
        >
          Add Day
        </Button>
      </Box>

      {/* Days */}

      {hours.map((day,index)=>{

        const selectedDays = hours.map(h=>h.day)

        return(

          <Box
            key={index}
            sx={{
              display:"flex",
              gap:2,
              mb:2,
              alignItems:"center"
            }}
          >

            {/* Day Dropdown */}

            <TextField
              select
              label="Day"
              value={day.day}
              sx={{width:160}}
              onChange={(e)=>handleChange(index,"day",e.target.value)}
            >

              {daysList
                .filter(d => !selectedDays.includes(d) || d===day.day)
                .map(d=>(
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}

            </TextField>

            {/* Open */}

            <TextField
              type="time"
              label="Open"
              InputLabelProps={{shrink:true}}
              disabled={shopClosed || !day.isOpen}
              value={day.open}
              onChange={(e)=>handleChange(index,"open",e.target.value)}
            />

            {/* Close */}

            <TextField
              type="time"
              label="Close"
              InputLabelProps={{shrink:true}}
              disabled={shopClosed || !day.isOpen}
              value={day.close}
              onChange={(e)=>handleChange(index,"close",e.target.value)}
            />

            {/* Open Checkbox */}

            <FormControlLabel
              control={
                <Checkbox
                  checked={day.isOpen}
                  disabled={shopClosed}
                  onChange={(e)=>handleChange(index,"isOpen",e.target.checked)}
                />
              }
              label="Open"
            />

          </Box>

        )

      })}

      {/* Save */}

      <Button
        variant="contained"
        sx={{mt:3}}
        onClick={handleSave}
      >
        Save Opening Hours
      </Button>

    </Paper>

  )
}