import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const handleLogin= async(e) => {
    e.preventDefault()
    try {
      const response = await axios.post("https://student-management-84vn.onrender.com/login", {
        email,password
      })
      console.log(response)
      if (response.status === 200) {
        alert("Login Successfull!!")
        sessionStorage.setItem("username", JSON.stringify(response.data.name))
        sessionStorage.setItem("email",JSON.stringify(response.data.email))
        sessionStorage.setItem("token", JSON.stringify(response.data.token))
        navigate('/home')
      }
    } catch (error) {
      console.log(error)
      alert(error.response.data)
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
      <div style={{ width: '320px' }}>
        <h2 className="text-center mb-4 text-uppercase fw-bold text-primary">Login</h2>
        <Form className="border p-4 rounded-4 shadow bg-white" onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-semibold">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
                className="rounded-3"
                onChange={(e)=>{setEmail(e.target.value)}}
            />
          </Form.Group>
  
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
                className="rounded-3"
                onChange={(e)=>{setPassword(e.target.value)}}
            />
          </Form.Group>
  
          <Button
            variant="primary"
            type="submit"
            className="w-100 rounded-3 mb-2 fw-bold"
          >
            Login
            </Button>
            <Form.Text className="text-muted">
            Don't Have An Account? <Link to={'/'}>Register</Link>
          </Form.Text>
        </Form>
      </div>
   </div>
  </>
  )
}

export default Login