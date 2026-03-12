'use client'

import { Box } from "@mui/material"
import Header from "../components/Header"
import AdminSidebar from "../components/AdminSidebar"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AdminLayout({ children }) {

  const router = useRouter()
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    const token = localStorage.getItem("adminToken")

    if(!token){
      router.replace("/login")   // redirect if no token
    }else{
      setLoading(false)
    }

  },[router])

  if(loading){
    return null
  }

  return (

    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <Header />

      {/* Body */}
      <Box sx={{ display: "flex", flex: 1 }}>

        {/* Sidebar */}
        <AdminSidebar />

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "#f4f6f8",
            p: 3
          }}
        >
          {children}
        </Box>

      </Box>

    </Box>

  )
}