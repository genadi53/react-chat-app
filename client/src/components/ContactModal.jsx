import React, { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/ContactContext";

export default function ContactModal({ hideModal }) {
  const idRef = useRef();
  const nameRef = useRef();
  const { createContact } = useContacts();

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(idRef.current.value, nameRef.current.value);
    createContact(idRef.current.value, nameRef.current.value);
    hideModal();
  };

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" idRef={idRef} required></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" nameRef={nameRef} required></Form.Control>
          </Form.Group>
          <Button type="submit" className="my-2">
            Create Contact
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
