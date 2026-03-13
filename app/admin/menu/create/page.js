'use client'

import { useEffect, useState } from "react"
import { Paper, TextField, Button, Typography, MenuItem, Box } from "@mui/material"
import { useRouter } from "next/navigation"
import { createMenuAPI, getCategoriesAPI } from "@/services/allAPI"

export default function CreateMenu() {
  const router = useRouter()
  const [categories, setCategories] = useState([])

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  // object to hold validation errors returned by backend
  const [errors, setErrors] = useState({})

  // Fetch categories from DB
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategoriesAPI()
      if(result.status === 200) setCategories(result.data)
    }
    fetchCategories()
  }, [])

  // Handle image change with preview
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if(file){
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  // Handle form submit
  const handleSubmit = async () => {
    // clear any previous errors
    setErrors({})

    if(!name || !price || !category){
      return alert("Please fill in all required fields")
    }

    const token = localStorage.getItem("adminToken")
    const reqHeader = { Authorization: `Bearer ${token}` }

    const reqBody = new FormData()
    reqBody.append("name", name)
    reqBody.append("description", description)
    reqBody.append("price", price)
    reqBody.append("category", category)
    if(image) reqBody.append("image", image)

    const result = await createMenuAPI(reqBody, reqHeader)
    if(result.status === 200){
      alert("Menu item created successfully")
      router.push("/admin/menu")
    } else {
      // backend might send an object with field errors or a message string
      if(result.data && typeof result.data === "object"){
        setErrors(result.data)
      } else {
        alert(result.data || "Error creating menu item")
      }
    }
  }

  return (
    <Paper sx={{p:4, maxWidth:600, margin:"auto"}}>
      <Typography variant="h5" mb={3} fontWeight="bold">
        Add Menu Item
      </Typography>

      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={e => {
          setName(e.target.value)
          if(errors.name) setErrors(prev=>({...prev,name:""}))
        }}
        required
        error={Boolean(errors.name)}
        helperText={errors.name}
      />

      <TextField
        label="Description"
        fullWidth
        margin="normal"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <TextField
        label="Price"
        fullWidth
        margin="normal"
        type="number"
        value={price}
        onChange={e => {
          setPrice(e.target.value)
          if(errors.price) setErrors(prev=>({...prev,price:""}))
        }}
        required
        error={Boolean(errors.price)}
        helperText={errors.price}
      />

      <TextField
        select
        label="Category"
        fullWidth
        margin="normal"
        value={category}
        onChange={e => {
          setCategory(e.target.value)
          if(errors.category) setErrors(prev=>({...prev,category:""}))
        }}
        required
        error={Boolean(errors.category)}
        helperText={errors.category}
      >
        <MenuItem value="">Select Category</MenuItem>
        {categories.map(cat => (
          <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
        ))}
      </TextField>

      <Box mt={2} mb={2}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </Box>

      {imagePreview && (
        <Box mb={2}>
          <Typography variant="subtitle2">Image Preview:</Typography>
          <img
            src={imagePreview}
            alt="Preview"
            style={{ width:"100%", maxHeight:"250px", objectFit:"cover", borderRadius:"8px" }}
          />
        </Box>
      )}

      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        sx={{ mt:2 }}
      >
        Create Menu Item
      </Button>
    </Paper>
  )
}