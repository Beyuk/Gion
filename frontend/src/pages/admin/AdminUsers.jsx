import { useEffect,useState } from "react"
import axios from "axios"

export default function AdminUsers(){

const [users,setUsers] = useState([])

const loadUsers = async ()=>{
 const res = await axios.get("http://localhost:5000/api/admin/users")
 setUsers(res.data)
}

const deleteUser = async(id)=>{
 if(!window.confirm("Delete user?")) return

 await axios.delete(`http://localhost:5000/api/admin/users/${id}`)
 loadUsers()
}

useEffect(()=>{
 loadUsers()
},[])

return(

<div>

<h1 className="text-3xl font-bold mb-6">Patients / Users</h1>

<table className="w-full border">

<thead>
<tr className="bg-gray-100">
<th className="p-3">Name</th>
<th>Email</th>
<th>Phone</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{users.map(u=>(
<tr key={u.id} className="border-t">
<td className="p-3">{u.name}</td>
<td>{u.email}</td>
<td>{u.phone}</td>

<td>
<button
onClick={()=>deleteUser(u.id)}
className="text-red-600"
>
Delete
</button>
</td>

</tr>
))}

</tbody>

</table>

</div>

)

}