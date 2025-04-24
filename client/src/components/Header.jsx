import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
   const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate()
    
    useEffect(() => {
        setName(JSON.parse(sessionStorage.getItem("username")))
        setEmail(JSON.parse(sessionStorage.getItem("email")))
    }, [])
    const logout = () => {
        sessionStorage.clear()
        navigate('/')
    }
  return (
    <Navbar bg="" className="shadow-sm" expand="lg">
      <Container className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <CircleUserRound size={50} />
          <div className="d-flex flex-column">
                      <span className="fw-bold">{ name}</span>
                      <span className="text-muted">{email}</span>
          </div>
        </div>
        <Button onClick={logout} variant="primary">Logout</Button>
      </Container>
    </Navbar>
  );
};

export default Header;
