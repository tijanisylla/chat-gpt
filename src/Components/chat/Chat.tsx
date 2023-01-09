import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { TypeChatProps } from "../data/Models";
import Typewriter from "typewriter-effect";
import AI__title from "../assets/robot1.png";
import "./Chat.css";
import { auth } from "../auth/authMethods";
import Loading from "./../loading/Loading";
const Chat: React.FC<TypeChatProps> = ({
  chatLog,
  setChatLog,
  lastMessage,
  setLastMessage,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const textRef = useRef<HTMLDivElement>(null);

  const fetchData = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let newChatLog = [...chatLog, { user: "me", message: `${input}` }];
    setInput("");
    setChatLog(newChatLog);
    const message = newChatLog.map((message) => message.message).join("\n");
    try {
      const response = await fetch("http://localhost:5050/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      });
      const data = await response.json();

      setChatLog([...newChatLog, { user: "gpt", message: `${data.message}` }]);
      setLastMessage(chatLog.length + 1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  // If GPT is typing than load icon else
  useEffect(() => {
    if (chatLog.length > 0) {
      if (chatLog[chatLog.length - 1].user === "gpt") {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    }
  }, [chatLog]);

  // Handle Enter key press
  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      fetchData(event as any);
    }
  };

  // Auto scroll to bottom of chat log page while "GPT" is responding
  const scrollBottom = () => {
    if (textRef.current) {
      textRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => scrollBottom(), [chatLog]);

  // Render
  return (
    <div className="chat__container" id="chat__container">
      {/* Title */}
      <div className="chat__title py-5">
        <img
          className="chat__title-img "
          src={AI__title}
          alt="AI__title"
          width="150"
          height="150"
        />

        <h1 className="text-slate-100">
          Hi 👋🏻 {auth.currentUser?.displayName}
        </h1>
        <p className="chat__title-p text-slate-300">
          Ask me anything you're curious about!
        </p>
      </div>

      {/* Messages */}
      <div className="chat__log">
        {chatLog.map((message, idx: number) => {
          return (
            <div
              className={`chat__message ${
                message.user === "gpt" && "chat__GPT"
              }`}
              key={idx}
            >
              <div className="chat__content">
                <img
                  src={`${
                    message.user === "gpt"
                      ? AI__title
                      : auth.currentUser?.providerData[0].photoURL
                  }`}
                  alt="avatar"
                />

                <div className="chat__text">
                  {/* TypeWriter only if AI is responding */}
                  {idx === lastMessage ? (
                    <Typewriter
                      options={{ delay: 50 }}
                      onInit={(typewriter) => {
                        typewriter
                          .typeString(message.message)
                          .callFunction(() => {
                            setIsLoading(false);
                          })
                          .start();
                      }}
                    />
                  ) : (
                    <p>{message.message}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="chat__form">
        <form onSubmit={fetchData}>
          {/* Need to disable this field is the AI is looking for a response */}

          <textarea
            value={input}
            required
            // disabled={isLoading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            className="chat__input-textarea"
            name="message"
            placeholder="Enter your message..."
          />

          <button type="submit" className="chat__submit">
            {isLoading ? (
              <Loading />
            ) : (
              <svg
                className="chat__send-icon"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 20 20"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            )}
          </button>
        </form>
        <div ref={textRef} />
      </div>
    </div>
  );
};

export default Chat;
