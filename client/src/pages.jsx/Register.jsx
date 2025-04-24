import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', {
        name,
        email,
        password,
      });
  
      if (response.status === 201) {
        alert("Registration Successful! Please login.");
        navigate('/login');
      } 
    } catch (error) {
      console.log(error);
      alert(error.response.data)
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
      <div style={{ width: '320px' }}>
        <h2 className="text-center mb-4 text-uppercase fw-bold text-primary">Register</h2>
        <Form className="border p-4 rounded-4 shadow bg-white" onSubmit={handleRegister}>

          <Form.Group className="mb-3" controlId="Name">
            <Form.Label className="fw-semibold">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              className="rounded-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-semibold">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="rounded-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              className="rounded-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 rounded-3 fw-bold mb-2"
          >
            Register
          </Button>
          <Form.Text className="text-muted">
            Already Have An Account? <Link to={'/login'}>Login</Link>
          </Form.Text>
        </Form>
      </div>
    </div>
  );
}

export default Register;
