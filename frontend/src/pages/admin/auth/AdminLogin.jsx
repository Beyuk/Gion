import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"

export default function AdminLogin(){

const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
const[error,setError]=useState("")

const navigate=useNavigate()

const login=async(e)=>{

e.preventDefault()

try{

const res=await axios.post(
"http://localhost:5000/api/admin-auth/login",
{email,password}
)

localStorage.setItem("adminToken",res.data.token)

if(res.data.admin.mustChangePassword){
navigate("/admin/change-password")
}else{
navigate("/admin")
}

}catch(err){

setError(err.response?.data?.message || "Login failed")

}

}

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<form onSubmit={login} className="bg-white p-8 rounded shadow w-96">

<h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

{error && <p className="text-red-500 mb-4">{error}</p>}

<input
type="email"
placeholder="Email"
className="w-full border p-3 mb-4"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
className="w-full border p-3 mb-4"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button className="w-full bg-blue-600 text-white p-3 rounded">
Login
</button>

</form>

</div>

)

}