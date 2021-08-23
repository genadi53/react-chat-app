import React from "react";
import Sidebar from "./Sidebar";
import OpenConversation from "./OpenConversation";
import { useConversaions } from "../contexts/ConversationContext";

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversaions();

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
}
