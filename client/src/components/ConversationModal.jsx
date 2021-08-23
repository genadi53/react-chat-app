import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useConversaions } from "../contexts/ConversationContext";
import { useContacts } from "../contexts/ContactContext";

export default function ConversationModal({ hideModal }) {
  const { contacts } = useContacts();
  const { createConversation } = useConversaions();

  const [selectedContactsIds, setSelectedContactsIds] = useState([]);

  const handleChange = (contactId) => {
    setSelectedContactsIds((prevIds) => {
      if (prevIds.includes(contactId)) {
        return prevIds.filter((id) => {
          return contactId !== id;
        });
      } else {
        return [...prevIds, contactId];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createConversation(selectedContactsIds);

    hideModal();
  };

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((c) => (
            <Form.Group controlId={c.id} key={c.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactsIds.includes(c.id)}
                onChange={() => handleChange(c.id)}
                label={c.name}
              />
            </Form.Group>
          ))}

          <Button type="submit" className="my-2">
            Create Conversation
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
