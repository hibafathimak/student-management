import { SquarePen } from "lucide-react";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { editStudentResponseContext } from "../contexts/ResponseContext";

function Edit({ student }) {
  const [show, setShow] = useState(false);
  const { editStudentResponse, setEditStudentResponse } = useContext(editStudentResponseContext)
  const [name, setName] = useState(student.name);
  const [age, setAge] = useState(student.age);
  const [grade, setGrade] = useState(student.grade);
  const [email, setemail] = useState(student.email);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setemail(inputEmail);
    setIsEmailValid(emailRegex.test(inputEmail));
  };
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = async () => {
    if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      alert("invalid Email")
      return;
    }
    try {
        const token = JSON.parse(sessionStorage.getItem("token"));
        const response = await axios.put(
          `https://student-management-84vn.onrender.com/edit/${student._id}`,
          { name, age, grade, email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        if (response.status === 200 ) {
          alert(response.data);
          handleClose()
          setEditStudentResponse(response)
        }
      } catch (error) {
        console.log(error);
        alert(error?.response?.data);
      }
  };

  return (
    <>
      <SquarePen
        className="text-primary"
        style={{ cursor: "pointer" }}
        onClick={handleShow}
      />

      <Modal show={show} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student Details</Modal.Title>
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
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
