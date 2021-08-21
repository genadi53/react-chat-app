import React, { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

export default function Login({ setId }) {
  const idRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setId(idRef.current.value);
  };

  const createNewId = () => {
    const id = uuidv4();
    setId(id);
  };

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group className="my-2">
          <Form.Label>Enter Your Id</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <Button type="submit" className="me-2">
          Login
        </Button>
        <Button variant="secondary" onClick={createNewId}>
          Create New ID
        </Button>
      </Form>
    </Container>
  );
}
