'use client'

import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  CircularProgress 
} from "@mui/material"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { adminLoginAPI } from "@/services/allAPI"

export default function LoginPage() {

  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)

  const handleLogin = async (e)=>{
    e.preventDefault()

    if(!email || !password){
      alert("Please fill all fields")
      return
    }

    const reqBody = { email, password }

    try{

      setLoading(true)

      const result = await adminLoginAPI(reqBody)

      if(result.status === 200){

        localStorage.setItem("adminToken",result.data.token)

        router.push("/admin/restaurantconfig")

      }else{

        alert(result.response?.data?.message)

      }

    }catch(err){

      alert("Login failed")

    }finally{

      setLoading(false)

    }
  }

  return (

    <Box
      sx={{
        minHeight:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        background:"linear-gradient(135deg,#f5f7fa,#e4ecf5)",
        px:2
      }}
    >

      <Paper
        elevation={6}
        sx={{
          width:"100%",
          maxWidth:420,
          p:4,
          borderRadius:3
        }}
      >

        <Typography
          variant="h4"
          fontWeight={600}
          textAlign="center"
          mb={1}
        >
          Admin Panel
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mb={3}
        >
          Sign in to manage restaurant content
        </Typography>

        <form onSubmit={handleLogin}>

          <TextField
            label="Email Address"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

     <Button
  type="submit"
  variant="contained"
  fullWidth
  size="large"
  sx={{
    mt:3,
    py:1.3,
    fontWeight:600,
    borderRadius:2,
    backgroundColor:"#0d47a1",
    "&:hover":{
      backgroundColor:"#08306b"
    }
  }}
  disabled={loading}
>

{loading ? (
  <CircularProgress size={24} sx={{ color:"#fff" }} />
) : (
  "Login"
)}

</Button>

        </form>

      </Paper>

    </Box>
  )
}