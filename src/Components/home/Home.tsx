import React, { useState } from "react";
import { ChatLogType } from "../data/Models";
import Chat from "../chat/Chat";
import SideBar from "../sidebar/SideBar";
import "./Home.css";

const Home: React.FC = () => {
  const [chatLog, setChatLog] = useState<ChatLogType[]>([
    { user: "gpt", message: "How can I help you ? 🙂" },
  ]);
  const [lastMessage, setLastMessage] = useState<number>(chatLog.length - 1);
  // create a function that clear the chat log and set the last message to 0
  const clearChat = (): void => {
    setChatLog([]);
  };
  return (
    <section className="chat" id="chat">
      <SideBar clearChat={clearChat} />
      <Chat
        chatLog={chatLog}
        setChatLog={setChatLog}
        lastMessage={lastMessage}
        setLastMessage={setLastMessage}
      />
    </section>
  );
};

export default Home;
