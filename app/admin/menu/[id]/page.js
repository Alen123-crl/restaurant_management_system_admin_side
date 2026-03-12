'use client'

import { useEffect, useState } from "react"
import { Paper, Typography, Button, TextField, Box, MenuItem } from "@mui/material"
import { useParams } from "next/navigation"
import { viewMenuAPI, editMenuAPI, getCategoriesAPI } from "@/services/allAPI"
import { serverURL } from "@/services/serverURL"

export default function MenuDetails() {
  const { id } = useParams()

  const [menu, setMenu] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [categories, setCategories] = useState([])

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState(null)

  // Fetch all categories
  const fetchCategories = async () => {
    const result = await getCategoriesAPI()
    if (result.status === 200) setCategories(result.data)
  }

  // Fetch single menu item
  const fetchMenu = async () => {
    const token = localStorage.getItem("adminToken")
    const reqHeader = { Authorization: `Bearer ${token}` }

    const result = await viewMenuAPI(id, reqHeader)
    if (result?.status === 200) {
      const data = result.data

      setMenu(data)
      setName(data.name)
      setDescription(data.description)
      setPrice(data.price)

      // If category is an object, get its _id, else assume it's already _id
      setCategory(data.category?._id || data.category)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchMenu()
  }, [])

  const handleUpdate = async () => {
    const token = localStorage.getItem("adminToken")
    const reqHeader = { Authorization: `Bearer ${token}` }

    const reqBody = new FormData()
    reqBody.append("name", name)
    reqBody.append("description", description)
    reqBody.append("price", price)
    reqBody.append("category", category)
    if (image) reqBody.append("image", image)

    const result = await editMenuAPI(id, reqBody, reqHeader)
    if (result.status === 200) {
      alert("Menu updated successfully")
      setEditMode(false)
      fetchMenu()
    }
  }

  if (!menu) return <Typography>Loading...</Typography>

  // Get category name for display
  const categoryName = categories.find(cat => cat._id === (menu.category?._id || menu.category))?.name || "N/A"

  return (
    <Paper sx={{ p: 4 }}>

      {!editMode ? (
        <>
          <Typography variant="h4" mb={2}>{menu.name}</Typography>

          {menu.image && (
            <Box mb={3}>
              <img
                src={`${serverURL}/uploads/${menu.image}`}
                style={{
                  width: "50%",
                  maxHeight: "350px",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />
            </Box>
          )}

          <Typography mb={2}>Category: {categoryName}</Typography>
          <Typography mb={2}>Price: ₹{menu.price}</Typography>
          <Typography mb={3}>{menu.description}</Typography>

          <Button variant="contained" onClick={() => setEditMode(true)}>Edit Menu</Button>
        </>
      ) : (
        <>
          <Typography variant="h5" mb={2}>Edit Menu</Typography>

          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={e => setName(e.target.value)}
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
            value={price}
            onChange={e => setPrice(e.target.value)}
          />

          <TextField
            select
            label="Category"
            fullWidth
            margin="normal"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          >
            <MenuItem value="">Select Category</MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
            ))}
          </TextField>

          <input type="file" onChange={e => setImage(e.target.files[0])} />

          <Box mt={2}>
            <Button variant="contained" onClick={handleUpdate}>Update</Button>
            <Button sx={{ ml: 2 }} onClick={() => setEditMode(false)}>Cancel</Button>
          </Box>
        </>
      )}
    </Paper>
  )
}