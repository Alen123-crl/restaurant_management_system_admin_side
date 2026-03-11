'use client'

import { useEffect, useState } from "react"
import {
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions
} from "@mui/material"
import { useRouter } from "next/navigation"
import { listMenuAPI, deleteMenuAPI } from "@/services/allAPI"
import { serverURL } from "@/services/serverURL"

export default function MenuPage(){

  const [menus,setMenus] = useState([])
  const router = useRouter()

  const fetchMenus = async ()=>{

    const result = await listMenuAPI()

    if(result.status === 200){
      setMenus(result.data)
    }

  }

  const handleDelete = async(id)=>{

    const token = localStorage.getItem("adminToken")

    const reqHeader = {
      Authorization:`Bearer ${token}`
    }

    const result = await deleteMenuAPI(id,reqHeader)

    if(result.status === 200){
      fetchMenus()
    }

  }

  useEffect(()=>{
    fetchMenus()
  },[])

  return(

    <Paper sx={{p:4}}>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Menu Management
      </Typography>

      <Button
        variant="contained"
        sx={{mb:4}}
        onClick={()=>router.push("/admin/menu/create")}
      >
        Add New Menu Item
      </Button>


      <Grid container spacing={3}>

        {menus.map((menu)=>(

          <Grid item xs={12} sm={6} md={4} lg={3} key={menu._id}>

            <Card
              sx={{
                borderRadius:3,
                boxShadow:3,
                transition:"0.3s",
                '&:hover':{
                  transform:"translateY(-5px)",
                  boxShadow:6
                }
              }}
            >

              {menu.image && (

                <CardMedia
                  component="img"
                  height="180"
                  image={`${serverURL}/uploads/${menu.image}`}
                  alt={menu.name}
                />

              )}

              <CardContent>

                <Typography variant="h6" fontWeight="bold">
                  {menu.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Category : {menu.category}
                </Typography>

                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  mt={1}
                >
                  ₹ {menu.price}
                </Typography>

              </CardContent>

              <CardActions sx={{px:2,pb:2}}>

                <Button
                  size="small"
                  variant="outlined"
                  onClick={()=>router.push(`/admin/menu/${menu._id}`)}
                >
                  View
                </Button>

                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={()=>handleDelete(menu._id)}
                >
                  Delete
                </Button>

              </CardActions>

            </Card>

          </Grid>

        ))}

      </Grid>

    </Paper>
  )
}