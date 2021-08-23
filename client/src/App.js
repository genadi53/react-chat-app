// import { useState } from "react";
import Login from "./components/Login";
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import Dashboard from "./components/Dashboard";
import { ContactProvider } from "./contexts/ContactContext";
import { ConversaionProvider } from "./contexts/ConversationContext";

function App() {
  const [id, setId] = useLocalStorage();

  const dashboard = (
    <ContactProvider>
      <ConversaionProvider id={id}>
        <Dashboard id={id} />
      </ConversaionProvider>
    </ContactProvider>
  );

  return <>{id ? dashboard : <Login setId={setId} />}</>;
}

export default App;
