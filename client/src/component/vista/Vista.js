import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Vista.css";

function Vista() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const history = useHistory();
  const user_id = sessionStorage.getItem("user_id");
  const access_token = sessionStorage.getItem("access_token");
  const userPlan = sessionStorage.getItem("user_plan");

  useEffect(() => {
    if (!sessionStorage.getItem("user_id")) {
      history.push("/login");
    }
    // else if (userPlan !== "pro") {
    //   // Redirect to the upgrade plan page if the user doesn't have a pro plan
    //   history.push("/upgradePlan");
    // }
    else {
      axios
        .get("http://localhost:5000/get_chat_history", {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "User-Id": user_id,
          },
        })
        .then((response) => {
          const messages = response.data.messages;
          if (messages.length === 0) {
            setMessages([
              {
                role: "psychologist",
                content:
                  "Hello, I'm Vista, your personal therapist. How can I assist you today?",
              },
            ]);
          } else {
            setMessages(messages);
          }
        })
        .catch((error) => {
          console.error("Error fetching chat history:", error);
        });
    }
  }, [history, user_id, access_token, userPlan]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Remove the input value immediately
    setInputValue("");

    const updatedMessages = [
      ...messages,
      { role: "user", content: inputValue },
      {
        role: "chatbot",
        content: (
          <div className="typingIndicator">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        ),
      },
    ];
    setMessages(updatedMessages);

    try {
      const response = await axios.post("http://localhost:5000/chatbot", {
        prompt: inputValue,
        role: JSON.stringify({
          role: "psychologist",
          name: "Vista",
          approach: ["logotherapy", "cognitive behavioural therapy"],
          guidelines: [
            "ask clarifying questions",
            "keep conversation natural",
            "never break character",
            "display curiosity and unconditional positive regard",
            "pose thought-provoking questions",
            "provide gentle advice and observations",
            "connect past and present",
            "seek user validation for observations",
            "avoid lists",
            "end with probing questions",
          ],
          topics: [
            "thoughts",
            "feelings",
            "behaviors",
            "free association",
            "childhood",
            "family dynamics",
            "work",
            "hobbies",
            "life",
          ],
          note: [
            "Vary topic questions in each response",
            "Vista should never end the session; continue asking questions until user decides to end the session",
          ],
        }),
      });

      if (response.data && response.data.response) {
        const newMessages = [
          ...updatedMessages.slice(0, -1), // Remove the "..." message
          { role: "psychologist", content: response.data.response },
        ];
        setMessages(newMessages);

        axios.post(
          "http://localhost:5000/save_chat",
          {
            messages: newMessages,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "User-Id": user_id,
            },
          }
        );
      } else {
        console.error("Invalid response from API:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setInputValue("");
  };

  return (
    <div className="body">
      {userPlan === "free" ? (
        <section className="section Chat">
          {/* Render the Vista component */}
          <div className="ChatHead">
            <li className="group">
              <div className="avatar"></div>
              <h1 className="font-only-heading GroupName mb-0">
                Vista - Your Personal Therapist
              </h1>
            </li>
          </div>
          <div className="MessageContainer">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role === "user" ? "me" : "you"}`}
              >
                <p className="messageContent">
                  {message.content || "No response from the assistant"}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form id="MessageForm" onSubmit={handleSubmit}>
            <input
              type="text"
              id="MessageInput"
              value={inputValue}
              autoComplete="off"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="btn btn-success">
              Send
            </button>
          </form>
        </section>
      ) : (
        // Render the upgrade modal
        <div className="upgrade-modal">
          <div className="upgrade-modal-content">
            <h2>Upgrade to the Pro Plan</h2>
            <p>
              To access the chatbot feature, you need to upgrade to the Pro
              plan.
            </p>
            <button
              className="btn btn-success"
              onClick={() => history.push("/PaymentPlan")}
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vista;
