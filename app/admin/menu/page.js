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
  MenuItem,
  TextField,
  Box
} from "@mui/material"
import { useRouter } from "next/navigation"
import { listMenuAPI, deleteMenuAPI, getCategoriesAPI } from "@/services/allAPI"
import { serverURL } from "@/services/serverURL"

export default function MenuPage() {

  const [menus, setMenus] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const router = useRouter()

  // Fetch menus
  const fetchMenus = async () => {
    const result = await listMenuAPI()
    if (result.status === 200) setMenus(result.data)
  }

  // Fetch categories
  const fetchCategories = async () => {
    const result = await getCategoriesAPI()
    if (result.status === 200) setCategories(result.data)
  }

  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken")
    const reqHeader = { Authorization: `Bearer ${token}` }

    const result = await deleteMenuAPI(id, reqHeader)
    if (result.status === 200) fetchMenus()
  }

  useEffect(() => {
    fetchMenus()
    fetchCategories()
  }, [])

  // Filter menus by category
  const filteredMenus = menus.filter(menu => 
    !selectedCategory || menu.category?._id === selectedCategory
  )

  return (
    <Paper sx={{ p: 4 }}>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Menu Management
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <Button
          variant="contained"
          onClick={() => router.push("/admin/menu/create")}
        >
          Add New Menu Item
        </Button>

        <TextField
          select
          label="Filter by Category"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map(cat => (
            <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
          ))}
        </TextField>
      </Box>

     <Grid container spacing={3}>
  {filteredMenus.map(menu => (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      key={menu._id}
      sx={{ display: "flex" }}
    >
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          transition: "0.3s",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          '&:hover': {
            transform: "translateY(-5px)",
            boxShadow: 6
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

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            {menu.name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Category: {menu.category?.name || "-"}
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold" mt={1}>
            ₹ {menu.price}
          </Typography>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => router.push(`/admin/menu/${menu._id}`)}
          >
            View
          </Button>

          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={() => handleDelete(menu._id)}
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