import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import io from "socket.io-client";

const socket = io("http://localhost:3009/");

function App() {
  const [messages, setMessages] = useState<Array<any>>([]);

  const [message, setMessage] = useState("hello");

  const [name, setName] = useState("mikita");

  useEffect(() => {
    socket.on("init-messages-published", (messages) => {
      setMessages(messages);
    });

    socket.on("new-message-sent", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  useEffect(() => {
    messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const messagesAnchorRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          height: "300px",
          width: "300px",
          overflowY: "scroll",
        }}
      >
        {messages.map((m) => {
          return (
            <div key={m.id}>
              <b>{m.user.name}: </b> {m.message}
              <hr />
            </div>
          );
        })}
        <div ref={messagesAnchorRef}></div>
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <button
        onClick={() => {
          socket.emit("client-name-sent", name);
        }}
      >
        submit name
      </button>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
      ></textarea>
      <button
        onClick={() => {
          socket.emit("client-message-sent", message);
          setMessage("");
        }}
      >
        send
      </button>
    </>
  );
}

export default App;
