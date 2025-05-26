import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    {
      message: "hello miki",
      id: "ewknedjndqejn",
      user: { id: "dekdnekdne", name: "mikita" },
    },
    {
      message: "hello mikita",
      id: "dweefwefwwef",
      user: { id: "dwefwewdedwe", name: "miki" },
    },
  ]);

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
            <div>
              <b>{m.user.name}: </b> {m.message}
              <hr />
            </div>
          );
        })}
      </div>
      <textarea name="" id=""></textarea>
      <button>send</button>
    </>
  );
}

export default App;
