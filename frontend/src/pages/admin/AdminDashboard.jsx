import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {

  const [appointments,setAppointments] = useState(0)
  const [users,setUsers] = useState(0)
  const [messages,setMessages] = useState(0)

  const loadStats = async () => {

    try{

      const appt = await axios.get("http://localhost:5000/api/appointments")
      setAppointments(appt.data.length)

      const usr = await axios.get("http://localhost:5000/api/admin/users")
      setUsers(usr.data.length)

      const msg = await axios.get("http://localhost:5000/api/admin/messages")
      setMessages(msg.data.length)

    }catch(err){
      console.log(err)
    }

  }

  useEffect(()=>{
    loadStats()
  },[])

  return(

    <div>

      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Appointments</p>
          <h2 className="text-3xl font-bold">{appointments}</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Patients</p>
          <h2 className="text-3xl font-bold">{users}</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Messages</p>
          <h2 className="text-3xl font-bold">{messages}</h2>
        </div>

      </div>

    </div>

  )

}