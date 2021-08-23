import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversaions } from "../contexts/ConversationContext";

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversaions();

  return (
    <ListGroup variant="flush">
      {conversations
        ? conversations.map((conversation, idx) => (
            <ListGroup.Item
              key={idx}
              action
              active={conversation.selected}
              onClick={() => selectConversationIndex(idx)}
            >
              {conversation.recipients.map((r) => r.name).join(", ")}
            </ListGroup.Item>
          ))
        : "no conversations"}
    </ListGroup>
  );
}
