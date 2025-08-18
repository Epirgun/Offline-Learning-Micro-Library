// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Flashcards from "./pages/Flashcards";
import Quiz from "./pages/Quiz";
import About from "./pages/About";
import HomeworkHelp from "./pages/HomeworkHelp.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flashcards/:subject" element={<Flashcards />} />
        <Route path="/quiz/:subject" element={<Quiz />} />
        <Route path="/about" element={<About />} />
        <Route path="/offline-homework-help" element={<HomeworkHelp />} />
      </Routes>
    </Router>
  );
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('Service Worker registration failed: ', registrationError);
      });
  });
}

export default App;
