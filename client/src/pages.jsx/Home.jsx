import React, {  useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import Edit from '../components/Edit'
import { Trash2 } from 'lucide-react'
import Add from '../components/Add'
import { addStudentResponseContext, editStudentResponseContext } from '../contexts/ContextApi'


const Home = () => {
  const { addStudentResponse, setAddStudentResponse } = useContext(addStudentResponseContext)
  const {editStudentResponse,setEditStudentResponse} = useContext(editStudentResponseContext)

  const [students, setStudents] = useState([])
  const [loading,setLoading]=useState(false)
  const fetchData = async () => {
    setLoading(true)
    const token = JSON.parse(sessionStorage.getItem('token'))
    if (token) {
      try {

        const response = await axios.get("http://localhost:3000/all-students", {
          headers: {
             "Authorization":`Bearer ${token}`
          }
        })
        setStudents(response.data)

      } catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    }
  }
  console.log(students)
  useEffect(() => {
    fetchData()
  }, [addStudentResponse,editStudentResponse])
  
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this student?")
  if (confirmDelete) {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"))
      const response = await axios.delete(`http://localhost:3000/student/delete/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (response.status === 200) {
        alert(response.data)
      }
      fetchData() 
    } catch (error) {
      console.error(error.response.data)
      alert(error.response.data)
    }
  }
  }
  return (
    <div className="">
      <Header />
      <div className='d-flex justify-content-between pt-5 px-4'>
        <h1>Students List</h1>
        <Add/>
      </div>
      <div className="p-4">
        {loading ? (
          <p>Loading Data...</p>
        ) : (
          students.length ? (
            students.map((student, index) => (
              <div key={index} className="mb-3 p-3 border rounded d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1"><strong>Name:</strong> {student.name}</p>
                  <p className="mb-1"><strong>Grade:</strong> {student.grade}</p>
                  <p className="mb-1"><strong>Age:</strong> {student.age}</p>
                  <p className="mb-1"><strong>Email:</strong> {student.email}</p>
                </div>
                <div className="d-flex gap-2">
                  <div><Edit student={student} /></div>
                  <Trash2 className="text-danger" style={{cursor:'pointer'}}   onClick={() => handleDelete(student._id)}/>
                  </div>
              </div>
            ))
          ) : (
            <p>No students found.</p>
          )
        )}
      </div>

    </div>
  )
}

export default Home