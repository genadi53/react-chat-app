import { useState } from "react";
import Login from "./components/Login";
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import Dashboard from "./components/Dashboard";
import { ContactProvider } from "./contexts/ContactContext";

function App() {
  const [id, setId] = useLocalStorage();

  const dashboard = (
    <ContactProvider>
      <Dashboard id={id} />
    </ContactProvider>
  );

  return <>{id ? dashboard : <Login setId={setId} />}</>;
}

export default App;
