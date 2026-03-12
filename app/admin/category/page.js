'use client'

import { useEffect, useState } from "react"
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material"

import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

import {
  createCategoryAPI,
  getCategoriesAPI,
  updateCategoryAPI,
  deleteCategoryAPI
} from "@/services/allAPI"

export default function CategoryAdmin() {

  const [name, setName] = useState("")
  const [categories, setCategories] = useState([])
  const [editId, setEditId] = useState(null)

  const token = localStorage.getItem("adminToken")
  const reqHeader = { Authorization: `Bearer ${token}` }

  const fetchCategories = async () => {
    const result = await getCategoriesAPI()
    if (result.status === 200) setCategories(result.data)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleSubmit = async () => {

    if (!name.trim()) return alert("Enter category name")

    if (editId) {

      const result = await updateCategoryAPI(editId, { name }, reqHeader)

      if (result.status === 200) {
        setName("")
        setEditId(null)
        fetchCategories()
      }

    } else {

      const result = await createCategoryAPI({ name }, reqHeader)

      if (result.status === 201) {
        setName("")
        fetchCategories()
      }
    }
  }

  const handleEdit = (cat) => {
    setName(cat.name)
    setEditId(cat._id)
  }

  const handleDelete = async (id) => {

    if (!confirm("Delete this category?")) return

    const result = await deleteCategoryAPI(id, reqHeader)

    if (result.status === 200) fetchCategories()
  }

  const cancelEdit = () => {
    setEditId(null)
    setName("")
  }

  return (

    <Box sx={{ maxWidth: 700, mx: "auto", mt: 2 }}>

      {/* Header */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Category Management
      </Typography>

      {/* Form */}
      <Paper sx={{ p: 2, mb: 2 }}>

        <Box sx={{ display: "flex", gap: 1 }}>

          <TextField
            label="Category Name"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            size="small"
            onClick={handleSubmit}
          >
            {editId ? "Update" : "Add"}
          </Button>

          {editId &&
            <Button
              size="small"
              onClick={cancelEdit}
            >
              Cancel
            </Button>
          }

        </Box>

      </Paper>

      {/* Table */}

      <TableContainer component={Paper}>

        <Table size="small">

          <TableHead>
            <TableRow>
              <TableCell><b>Category</b></TableCell>
              <TableCell align="right"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {categories.map((cat) => (

              <TableRow key={cat._id} hover>

                <TableCell>{cat.name}</TableCell>

                <TableCell align="right">

                  <IconButton
                    size="small"
                    onClick={() => handleEdit(cat)}
                  >
                    <EditIcon fontSize="small"/>
                  </IconButton>

                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(cat._id)}
                  >
                    <DeleteIcon fontSize="small"/>
                  </IconButton>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Box>
  )
}