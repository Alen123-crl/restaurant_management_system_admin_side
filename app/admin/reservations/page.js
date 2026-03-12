"use client"

import { getReservationsAPI } from "@/services/allAPI"
import { useEffect, useState } from "react"


export default function ReservationsPage() {

  const [reservations, setReservations] = useState([])

  const fetchReservations = async () => {

    const reqHeader = {
      "Content-Type": "application/json"
    }

    const result = await getReservationsAPI(reqHeader)

    if (result.status === 200) {
      setReservations(result.data)
    }
  }

  useEffect(()=>{
    fetchReservations()
  },[])

  return (
    <div style={{padding:"30px"}}>

      <h2>Reservation Details</h2>

      <table border="1" cellPadding="10" style={{width:"100%"}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Date</th>
            <th>Slot</th>
            <th>Guests</th>
          </tr>
        </thead>

        <tbody>

          {reservations.map((slotData,index)=>(
            slotData.reservations.map((r,i)=>(
              <tr key={`${index}-${i}`}>
                <td>{r.name}</td>
                <td>{r.phone}</td>
                <td>{r.email}</td>
                <td>{new Date(slotData.date).toLocaleDateString()}</td>
                <td>{slotData.slot}</td>
                <td>{r.guests}</td>
              </tr>
            ))
          ))}

        </tbody>

      </table>

    </div>
  )
}