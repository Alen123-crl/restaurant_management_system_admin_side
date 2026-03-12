"use client"

import React, { useEffect, useState } from "react"
import {
  createRestaurantConfigAPI,
  getRestaurantConfigAPI,
  updateRestaurantConfigAPI
} from "@/services/allAPI"

export default function RestaurantConfig() {

  const [config, setConfig] = useState({
    totalSeats: 0,
    slotDuration: 60
  })

  const [isExisting, setIsExisting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    setLoading(true)
    const result = await getRestaurantConfigAPI()
    if (result?.status === 200 && result.data) {
      setConfig({
        totalSeats: result.data.totalSeats,
        slotDuration: result.data.slotDuration
      })
      setIsExisting(true)
    } else {
      setConfig({ totalSeats: 0, slotDuration: 60 })
      setIsExisting(false)
    }
    setLoading(false)
  }

  const incrementSeats = () => setConfig(prev => ({ ...prev, totalSeats: prev.totalSeats + 1 }))
  const decrementSeats = () => setConfig(prev => ({ ...prev, totalSeats: prev.totalSeats > 0 ? prev.totalSeats - 1 : 0 }))
  const handleSlotChange = (e) => setConfig(prev => ({ ...prev, slotDuration: e.target.value }))

  const handleSubmit = async () => {
    const token = localStorage.getItem("adminToken")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }

    try {
      if (!isExisting) {
        const result = await createRestaurantConfigAPI(config, reqHeader)
        if (result.status === 201) {
          setMessage("Configuration created successfully")
          fetchConfig()
        }
      } else {
        const result = await updateRestaurantConfigAPI(config, reqHeader)
        if (result.status === 200) {
          setMessage("Configuration updated successfully")
          fetchConfig()
        }
      }
    } catch (err) {
      setMessage("Something went wrong")
      console.error(err)
    }
  }

  if (loading) return <p style={{ padding: "30px" }}>Loading...</p>

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px", gap: "40px", flexWrap: "wrap" }}>

      {/* Form Card */}
      <div style={{ width: "400px", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", background: "white" }}>
        <h1 style={{ marginBottom: "10px" }}>Restaurant Settings</h1>
        <p style={{ color: "#666", marginBottom: "20px" }}>Adjust seats and slot duration below.</p>

        <div style={{ marginBottom: "20px" }}>
          <label>Total Seats</label>
          <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
            <button type="button" onClick={decrementSeats} style={buttonStyle}>-</button>
            <span style={{ margin: "0 15px", fontSize: "16px" }}>{config.totalSeats}</span>
            <button type="button" onClick={incrementSeats} style={buttonStyle}>+</button>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Slot Duration (minutes)</label>
          <input
            type="number"
            value={config.slotDuration}
            onChange={handleSlotChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "6px", border: "1px solid #ddd" }}
          />
        </div>

        {message && <p style={{ color: "green", marginBottom: "10px" }}>{message}</p>}

        <button onClick={handleSubmit} style={{ ...buttonStyle, width: "100%" }}>
          {isExisting ? "Update Configuration" : "Create Configuration"}
        </button>
      </div>

      {/* Display Current Configuration */}
      <div style={{ width: "300px", padding: "25px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", background: "#f8f8f8" }}>
        <h3 style={{ marginBottom: "15px" }}>Current Configuration</h3>
        <p><strong>Total Seats:</strong> {config.totalSeats}</p>
        <p><strong>Slot Duration:</strong> {config.slotDuration} min</p>
      </div>

    </div>
  )
}

const buttonStyle = {
  padding: "6px 12px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  background: "black",
  color: "white",
  fontSize: "16px"
}