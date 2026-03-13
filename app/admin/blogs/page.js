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
  CardActions,
  Box
} from "@mui/material"
import { listBlogsAPI, deleteBlogAPI } from "@/services/allAPI"
import { useRouter } from "next/navigation"
import { serverURL } from "@/services/serverURL"

export default function BlogsPage(){

  const [blogs,setBlogs] = useState([])
  const router = useRouter()

  const fetchBlogs = async ()=>{

    const result = await listBlogsAPI()

    if(result.status === 200){
      setBlogs(result.data)
    }

  }

  const handleDelete = async(id)=>{

    const token = localStorage.getItem("adminToken")

    const reqHeader={
      Authorization:`Bearer ${token}`
    }

    const result = await deleteBlogAPI(id,reqHeader)

    if(result.status === 200){
      fetchBlogs()
    }

  }

  useEffect(()=>{
    fetchBlogs()
  },[])

  return(

    <Paper sx={{p:4}}>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Blog Management
      </Typography>

      <Button
        variant="contained"
        sx={{mb:4}}
        onClick={()=>router.push("/admin/blogs/create")}
      >
        Create Blog
      </Button>

      <Grid container spacing={3}>

        {blogs.map((blog)=>(

    <Grid key={blog._id} size={{xs:12, sm:6, md:6, lg:4, xl:3}}>

         <Card
  sx={{
    height: "100%",
    maxWidth: 350,
    margin: "auto",
    borderRadius: 3,
    boxShadow: 3
  }}
>
<CardMedia
  component="img"
  image={`${serverURL}/uploads/${blog.image}`}
  sx={{
    height: 200,
    objectFit: "cover"
  }}
/>

              <CardContent sx={{flexGrow:1}}>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    display:"-webkit-box",
                    WebkitLineClamp:2,
                    WebkitBoxOrient:"vertical",
                    overflow:"hidden"
                  }}
                >
                  {blog.title}
                </Typography>

              <Typography
  variant="body2"
  color="text.secondary"
  sx={{
    mt:1,
    display:"-webkit-box",
    WebkitLineClamp:2,
    WebkitBoxOrient:"vertical",
    overflow:"hidden"
  }}
>
  {blog.content}
</Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{display:"block",mt:2}}
                >
                  {new Date(blog.date).toLocaleDateString()}
                </Typography>

              </CardContent>

              <CardActions sx={{p:2}}>

                <Button
                  size="small"
                  variant="outlined"
                  onClick={()=>router.push(`/admin/blogs/${blog._id}`)}
                >
                  View
                </Button>

                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={()=>handleDelete(blog._id)}
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