import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const subjects = ["Math", "Science", "Vocabulary"];

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-pink-400 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-white mb-10 animate-pulse">
        Offline Micro Library
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {subjects.map((subject) => (
          <div
            key={subject}
            className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-center justify-center hover:scale-105 transform transition duration-300"
          >
            <h2 className="text-2xl font-semibold mb-4">{subject}</h2>
            <div className="flex flex-col gap-3 w-full">
              <Link
                to={`/flashcards/${subject.toLowerCase()}`}
                className="bg-blue-500 text-white font-bold py-2 rounded-lg text-center hover:bg-blue-600 transition"
              >
                Flashcards
              </Link>
              <Link
                to={`/quiz/${subject.toLowerCase()}`}
                className="bg-green-500 text-white font-bold py-2 rounded-lg text-center hover:bg-green-600 transition"
              >
                Quiz
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
