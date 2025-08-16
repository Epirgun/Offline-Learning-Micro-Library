import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import questionsData from "../data/questions.json";

export default function Flashcards() {
  const { subject } = useParams();
  const questions = questionsData[subject] || [];
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleNext = () => {
    // Only move to next card if currently showing question
    if (flipped) return;

    setCurrent((prev) => (prev + 1) % questions.length);
  };

  if (questions.length === 0) return <div>No questions for this subject.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 to-pink-300 flex flex-col items-center justify-center p-6">

      <Link
        to="/"
        className="mb-8 bg-white text-purple-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
      >
        Back to Home
      </Link>

      <div 
        className="w-80 h-48 perspective cursor-pointer"
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`card-inner ${flipped ? "flipped" : ""}`}>
          <div className="card-front">{questions[current].question}</div>
          <div className="card-back">{questions[current].answer}</div>
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={flipped} // only enabled when question side is showing
        className="mt-6 bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition transform hover:scale-105 disabled:opacity-50"
      >
        Next Card
      </button>
    </div>
  );
}
