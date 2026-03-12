'use client'

import { useEffect, useState } from "react"
import { Paper, Typography, TextField, Button, Box, Checkbox, FormControlLabel, IconButton } from "@mui/material"
import { TimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { createSpecialAPI, getSpecialAPI } from "@/services/allAPI"

export default function SpecialHours() {
  const [date, setDate] = useState("")
  const [slots, setSlots] = useState([{ open: null, close: null }])
  const [isClosed, setIsClosed] = useState(false)
  const [note, setNote] = useState("")
  const [special, setSpecial] = useState([])

  // Fetch existing special hours
  const fetchSpecial = async () => {
    const result = await getSpecialAPI()
    if (result.status === 200) setSpecial(result.data)
  }

  useEffect(() => { fetchSpecial() }, [])

  // Add new slot
  const addSlot = () => setSlots([...slots, { open: null, close: null }])
  // Remove slot
  const removeSlot = (index) => setSlots(slots.filter((_, i) => i !== index))
  // Update slot time
  const handleSlotChange = (index, field, value) => {
    const updated = [...slots]
    updated[index][field] = value
    setSlots(updated)
  }

  // Convert Date object to 12-hour time string
  const formatAMPM = (dateObj) => {
    if (!dateObj) return ""
    let hours = dateObj.getHours()
    let minutes = dateObj.getMinutes()
    const ampm = hours >= 12 ? "PM" : "AM"
    hours = hours % 12 || 12
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`
  }

  // Submit special hours
  const handleSubmit = async () => {
    if (!date) return alert("Select a date")
    const token = localStorage.getItem("adminToken")
    const reqHeader = { Authorization: `Bearer ${token}` }

    // Prepare slots as strings "HH:mm"
    const formattedSlots = slots.map(sl => ({
      open: sl.open ? sl.open.toTimeString().slice(0,5) : "",
      close: sl.close ? sl.close.toTimeString().slice(0,5) : ""
    }))

    const reqBody = { date, slots: formattedSlots, isClosed, note }

    const result = await createSpecialAPI(reqBody, reqHeader)
    if (result.status === 201) {
      alert("Special hours added")
      setDate(""); setSlots([{ open: null, close: null }]); setIsClosed(false); setNote("")
      fetchSpecial()
    } else {
      alert(result.data || "Error adding special hours")
    }
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 700, margin: "auto" }}>
      <Typography variant="h5" mb={3} sx={{ fontWeight: 'bold' }}>Special Days</Typography>

      {/* Date and Closed */}
      <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems:"center" }}>
        <TextField type="date" value={date} onChange={e => setDate(e.target.value)} fullWidth />
        <FormControlLabel
          control={<Checkbox checked={isClosed} onChange={e => setIsClosed(e.target.checked)} />}
          label="Closed Full Day"
        />
      </Box>

      {/* Slots */}
      {!isClosed && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {slots.map((slot, i) => (
            <Box key={i} sx={{ display: "flex", gap: 2, mb: 2, alignItems:"center" }}>
              <TimePicker
                label="Open"
                value={slot.open}
                onChange={(newValue) => handleSlotChange(i, "open", newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                label="Close"
                value={slot.close}
                onChange={(newValue) => handleSlotChange(i, "close", newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
              {slots.length > 1 && (
                <IconButton color="error" onClick={() => removeSlot(i)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}

          <Button startIcon={<AddIcon />} onClick={addSlot} sx={{ mb:2 }}>Add Another Slot</Button>
        </LocalizationProvider>
      )}

      {/* Note */}
      <TextField label="Note" value={note} onChange={e => setNote(e.target.value)} fullWidth sx={{ mb:2 }} />

      {/* Submit */}
      <Button variant="contained" onClick={handleSubmit}>Add</Button>

      {/* Display special hours */}
      <Box sx={{ mt:3 }}>
        {special.map(s => (
          <Typography key={s._id} sx={{ mb:1 }}>
            <strong>{new Date(s.date).toDateString()}</strong> :{" "}
            {s.isClosed
              ? `Closed${s.note ? ` (${s.note})` : ""}`
              : s.slots.map(sl => `Open: ${formatAMPM(new Date(`1970-01-01T${sl.open}:00`))}, Close: ${formatAMPM(new Date(`1970-01-01T${sl.close}:00`))}${s.note ? ` (${s.note})` : ""}`).join(" | ")
            }
          </Typography>
        ))}
      </Box>
    </Paper>
  )
}