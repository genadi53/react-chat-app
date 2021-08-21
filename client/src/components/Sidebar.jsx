import React, { useState } from "react";
import { Tab, Nav, Modal, Button } from "react-bootstrap";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import ContactModal from "./ContactModal";
import ConversationModal from "./ConversationModal";

const conversations_key = "conversations";
const contacts_key = "contacts";

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(conversations_key);
  const [modalOpen, setModalOpen] = useState(false);
  const conversationOpen = activeKey === conversations_key;

  const hideModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="d-flex flex-column" style={{ width: "250px" }}>
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={conversations_key}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={contacts_key}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-end overflow-auto flex-grow-1">
          <Tab.Pane eventKey={conversations_key}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={contacts_key}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          Your ID is: <span className="text-muted">{id}</span>
        </div>
        <Button className="rouded-0" onClick={() => setModalOpen(true)}>
          New {conversationOpen ? "Conversation" : "Contact"}
        </Button>
      </Tab.Container>
      <Modal show={modalOpen} onHide={hideModal}>
        {conversationOpen ? (
          <ConversationModal hideModal={hideModal} />
        ) : (
          <ContactModal hideModal={hideModal} />
        )}
      </Modal>
    </div>
  );
}
