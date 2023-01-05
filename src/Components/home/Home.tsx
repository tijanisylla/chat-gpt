import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";

import "./Home.css";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [input, setInput] = useState<string>("");

  interface IState {
    user: string;
    message: string;
  }

  const [chatLog, setChatLog] = useState<IState[]>([
    { user: "gpt", message: "How can i help you today ?" },
  ]);

  const fetchData = async (e: React.FormEvent) => {
    e.preventDefault();
    let newChatLog: IState[] = [
      ...chatLog,
      { user: "Me", message: `${input}` },
    ];
    setInput("");
    setChatLog(newChatLog);
    try {
      const response = await fetch("http://localhost:8000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newChatLog.map((message) => message.message).join("\n"),
        }),
      });
      const data = await response.json();
      await setChatLog([
        ...newChatLog,
        { user: "gpt", message: `${data.message}` },
      ]);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={fetchData}>
        <input
          type="text"
          name="message"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Enter your message..."
        />
        <br />
        <br />
        <br />
        <button type="submit">Send Message</button>
      </form>
      <div>
        <button onClick={() => window.location.reload()}>Reset</button>

        {/* Chat */}
        {chatLog.map((data, idx) => {
          return (
            <div key={idx}>
              <h1>{data.user}</h1>
              <TypeAnimation
                sequence={[`${data.message}`]}
                wrapper="div"
                cursor={false}
                style={{ fontSize: "2em" }}
              />{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
