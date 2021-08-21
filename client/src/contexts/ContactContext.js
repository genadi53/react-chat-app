import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactContext = createContext(null);

export const useContacts = () => {
  return useContext(ContactContext);
};

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const createContact = (id, name) => {
    setContacts((prev) => {
      console.log(id, name);
      return [...prev, { id, name }];
    });
  };

  return (
    <ContactContext.Provider value={(contacts, setContacts)}>
      {children}
    </ContactContext.Provider>
  );
};
