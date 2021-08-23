import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactContext";
const ConversaionContext = React.createContext();

export function useConversaions() {
  return useContext(ConversaionContext);
}

export function ConversaionProvider({ children }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();

  function createConversation(recipients) {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

  const formattedConversations = conversations.map((conversation, idx) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    const selected = idx === selectedConversationIndex;
    return { ...conversation, recipients, selected };

    // const messages = conversation.messages.map((message) => {
    //   const contact = contacts.find((contact) => {
    //     return contact.id === message.sender;
    //   });
    //   const name = (contact && contact.name) || message.sender;
    //   const fromMe = id === message.sender;
    //   return { ...message, senderName: name, fromMe };
    // });

    // const selected = index === selectedConversationIndex;
    // return { ...conversation, messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    createConversation,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectConversationIndex: setSelectedConversationIndex,
  };

  return (
    <ConversaionContext.Provider value={value}>
      {children}
    </ConversaionContext.Provider>
  );
}
