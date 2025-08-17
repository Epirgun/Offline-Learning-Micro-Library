// src/pages/OfflineHomeworkHelp.js
import React, { useState } from "react";

// Preloaded Q&A database
const FAQ = [
  { question: "What is 2+2?", answer: "2 + 2 equals 4." },
  { question: "Define photosynthesis", answer: "Photosynthesis is the process by which plants make food using sunlight." },
  { question: "What is the capital of France?", answer: "The capital of France is Paris." },
  { question: "Simplify 2x + 3x", answer: "2x + 3x simplifies to 5x." },
  { question: "What is the square root of 16?", answer: "The square root of 16 is 4." },
  // Add more Q&A here...
];

export default function OfflineHomeworkHelp() {
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState([]);

  const handleSend = () => {
    if (!input) return;

    setResponses((prev) => [...prev, { type: "user", text: input }]);

    // Simple matching algorithm
    const match = FAQ.find((faq) =>
      input.toLowerCase().includes(faq.question.toLowerCase())
    );

    const botResponse = match
      ? match.answer
      : "I don't know the answer to that. Try rephrasing your question.";

    setResponses((prev) => [...prev, { type: "bot", text: botResponse }]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-300 to-orange-400 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-white mb-6">📝 Homework Help (Offline)</h1>

      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md flex flex-col gap-4">
        <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
          {responses.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg ${
                msg.type === "user" ? "bg-blue-400 text-white self-end" : "bg-gray-200 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded p-2"
            placeholder="Ask a homework question..."
          />
          <button
            onClick={handleSend}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
