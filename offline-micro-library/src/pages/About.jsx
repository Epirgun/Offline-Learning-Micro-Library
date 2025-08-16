import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 to-pink-400 flex flex-col items-center justify-center p-6 text-center">
      
      <Link
        to="/"
        className="mb-8 bg-white text-indigo-500 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
      >
        Back to Home
      </Link>

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-11/12 md:w-2/3 animate-pulse">
        <h1 className="text-4xl font-extrabold mb-6 text-purple-600">About Offline Learning Micro Library</h1>
        
        <p className="text-lg mb-4">
          This project is a Progressive Web App (PWA) designed to make learning accessible for students in under-resourced communities. 
          Once the content is loaded, students can continue learning offline, without any internet connection.
        </p>

        <p className="text-lg mb-4">
          Features include:
        </p>
        <ul className="text-left list-disc list-inside mb-4">
          <li>Flashcards with tap-to-flip animation for Math, Science, and Vocabulary</li>
          <li>Multiple-choice quizzes to test knowledge and track progress</li>
          <li>Offline access via PWA caching – keep learning anywhere!</li>
          <li>Lively animations and colorful UI to make learning fun</li>
        </ul>

        <p className="text-lg">
          This project was built using <span className="font-bold text-indigo-700">React</span> and <span className="font-bold text-pink-600">Tailwind CSS</span>, with a focus on simplicity, accessibility, and engagement.
        </p>
      </div>
    </div>
  );
}
