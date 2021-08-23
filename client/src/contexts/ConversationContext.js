import React, { useContext, useState, useCallback, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactContext";
import { useSocket } from "./SocketContext";

// import { arrayEquals } from "../utils/arrayEquals";

const ConversaionContext = React.createContext();

export function useConversaions() {
  return useContext(ConversaionContext);
}

export function ConversaionProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();
  const socket = useSocket();

  function createConversation(recipients) {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

  const addMessageToConversations = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversations) => {
        let madeChanges = false;
        const newMessage = { sender, text };

        // console.log(prevConversations);
        const newConversation = prevConversations.map((conversation) => {
          // console.log(conversation.recipients);
          // console.log(recipients);
          const areEqual = arrayEquality(conversation.recipients, recipients);
          // console.log(areEqual);
          if (areEqual) {
            madeChanges = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });

        if (madeChanges) {
          return newConversation;
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  const sendMessage = (recipients, text) => {
    socket.emit("send-message", { recipients, text });
    addMessageToConversations({
      recipients,
      text,
      sender: id,
    });
  };

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", addMessageToConversations);

    return () => socket.off("receive-message");
  }, [socket, addMessageToConversations]);

  const formattedConversations = conversations.map((conversation, idx) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    });

    const selected = idx === selectedConversationIndex;
    return { ...conversation, recipients, messages, selected };
  });

  const value = {
    conversations: formattedConversations,
    createConversation,
    sendMessage,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectConversationIndex: setSelectedConversationIndex,
  };

  return (
    <ConversaionContext.Provider value={value}>
      {children}
    </ConversaionContext.Provider>
  );
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}
