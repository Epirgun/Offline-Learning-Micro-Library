import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import homeworkQuestions from "../data/homeworkQuestions.json";

const followUps = [
  "Do you want me to give an example?",
  "Would you like a step-by-step solution?",
  "Should I explain it in a simpler way?"
];

export default function HomeworkHelp() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’m your homework helper 🤖. Pick a question to get started!" }
  ]);
  const [options, setOptions] = useState([]);
  const [remainingQuestions, setRemainingQuestions] = useState([]);

  // Initialize questions
  useEffect(() => {
    const shuffled = [...homeworkQuestions].sort(() => 0.5 - Math.random());
    setOptions(shuffled.slice(0, 5));
    setRemainingQuestions(shuffled.slice(5));
  }, []);

  const handleQuestionClick = (q) => {
    const botMessage = {
      from: "bot",
      text: q.answer // <-- shows the actual answer
    };

    setMessages((prev) => [
      ...prev,
      { from: "user", text: q.question },
      botMessage
    ]);

    if (Math.random() > 0.4) {
      setTimeout(() => {
        const followUp = {
          from: "bot",
          text: followUps[Math.floor(Math.random() * followUps.length)]
        };
        setMessages((prev) => [...prev, followUp]);
      }, 800);
    }
  };

  const loadMoreQuestions = () => {
    if (remainingQuestions.length === 0) return;
    const nextFive = remainingQuestions.slice(0, 5);
    const newRemaining = remainingQuestions.slice(5);
    setOptions(nextFive);
    setRemainingQuestions(newRemaining);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-300 to-orange-400 flex flex-col items-center p-6">

      {/* BACK TO HOME BUTTON */}
      <Link
        to="/"
        className="mb-6 self-start bg-white text-orange-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
      >
        ◀ Back to Home
      </Link>

      <h1 className="text-4xl font-bold mb-6 animate-pulse text-white">Homework Help Chatbot</h1>

      <div className="bg-white rounded-2xl shadow-xl p-4 w-full max-w-lg flex flex-col">
        <div className="flex-1 overflow-y-auto max-h-96 space-y-3 mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg max-w-[80%] animate-fadeIn ${
                msg.from === "bot"
                  ? "bg-orange-100 self-start"
                  : "bg-blue-400 text-white self-end"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {options.map((q) => (
            <button
              key={q.id}
              onClick={() => handleQuestionClick(q)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition transform hover:scale-105"
            >
              {q.question}
            </button>
          ))}
        </div>

        {remainingQuestions.length > 0 && (
          <button
            onClick={loadMoreQuestions}
            className="mt-3 bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 transition transform hover:scale-105"
          >
            Load 5 More Questions
          </button>
        )}
      </div>
    </div>
  );
}
