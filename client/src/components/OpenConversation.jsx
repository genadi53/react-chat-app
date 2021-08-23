import React, { useState, useCallback } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useConversaions } from "../contexts/ConversationContext";

export default function OpenConversation() {
  const [text, setText] = useState("");
  //      style={{ border: "1px solid black" }}
  const { selectedConversation, sendMessage } = useConversaions();
  const setRef = useCallback((node) => {
    if (node) node.scrollIntoView({ smooth: true });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipients = selectedConversation.recipients.map((r) => r.id);

    sendMessage(recipients, text);
    setText("");
  };

  const lastMessage = selectedConversation.messages.length - 1;
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div
          className=" d-flex 
        flex-column align-items-start justify-content-end px-3 mt-2"
        >
          {selectedConversation.messages.map((message, idx) => {
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={idx}
                className={`ms-1 d-flex flex-column ${
                  message.fromMe
                    ? "align-self-end align-items-end "
                    : " align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 
                ${message.fromMe ? "bg-primary text-white" : "border"}`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.fromMe ? "text-right" : ""
                  }`}
                >
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
              required
            />
            <InputGroup.Append>
              <Button type="submit" className="h-100 ms-1">
                Send
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
