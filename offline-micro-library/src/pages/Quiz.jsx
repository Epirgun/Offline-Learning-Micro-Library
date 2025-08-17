import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import questionsData from "../data/questions.json";

export default function Quiz() {
  const { subject } = useParams();
  const questions = questionsData[subject] || [];
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false); // new state

  if (questions.length === 0) return <div>No questions for this subject.</div>;

  const question = questions[current];

  const handleAnswer = (choice) => {
    setSelected(choice);
    setShowNext(true);
    if (choice === question.answer) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    setSelected(null);
    setShowNext(false);
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      setQuizFinished(true); // finish quiz after last question
    }
  };

  // Show quiz finished screen
  if (quizFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-yellow-300 to-orange-400 flex flex-col items-center justify-center p-6">
        <Link
          to="/"
          className="mb-8 bg-white text-orange-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
        >
          Back to Home
        </Link>
        <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
          <h2 className="text-2xl font-bold mb-4 text-orange-600">
            🎉 Quiz Completed!
          </h2>
          <p className="text-lg mb-2">You answered {score} / {questions.length} correctly.</p>
          <Link
            to="/"
            className="mt-4 inline-block bg-purple-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-600 transition transform hover:scale-105"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-300 to-orange-400 flex flex-col items-center justify-center p-6">
      
      <Link
        to="/"
        className="mb-8 bg-white text-orange-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
      >
        Back to Home
      </Link>

      <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
        {/* New: Question counter */}
        <p className="mb-2 text-lg font-semibold text-orange-600">
          Question {current + 1} / {questions.length}
        </p>

        <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
        <div className="flex flex-col gap-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              disabled={showNext}
              className={`py-2 px-4 rounded-lg transition transform hover:scale-105 ${
                selected === option
                  ? option === question.answer
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-blue-400 text-white hover:bg-blue-500"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {showNext && (
          <button
            onClick={handleNext}
            className="mt-4 bg-purple-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-600 transition transform hover:scale-105"
          >
            Next Question
          </button>
        )}

        {/* New: Correct answer counter */}
        <p className="mt-4 text-lg font-semibold">
          Correct Answers: {score} / {questions.length}
        </p>
      </div>
    </div>
  );
}
