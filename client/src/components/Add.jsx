import React, { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { addStudentResponseContext } from "../contexts/ResponseContext";

const Add = () => {
  const [show, setShow] = useState(false);
  const { addStudentResponse, setAddStudentResponse } = useContext(addStudentResponseContext)
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [email, setemail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setemail(inputEmail);
    setIsEmailValid(emailRegex.test(inputEmail));
  };
    const handleClose = () => {
        setShow(false)
        setName('');
        setAge('');
        setGrade('');
        setemail('');
      
  };
  const handleShow = () => setShow(true);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      alert("invalid Email")
      return;
    }
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.post(
        "https://student-management-84vn.onrender.com/student/add",
        { name, age, grade, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if ( response.status === 201) {
        alert(response.data);
        handleClose()
        setAddStudentResponse(response)
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data);
    }
  };
  
  return (
    <div>
      <Button className="" style={{ cursor: "pointer" }} onClick={handleShow}>
        Add New
      </Button>

      <Modal show={show} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="editName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="rounded-3"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={age}
                className="rounded-3"
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editGrade">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="Enter grade"
                className="rounded-3"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editemail">
              <Form.Label>email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter email"
                className="rounded-3"
                isInvalid={!isEmailValid}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Add;
