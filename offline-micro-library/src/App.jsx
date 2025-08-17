// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Flashcards from "./pages/Flashcards";
import Quiz from "./pages/Quiz";
import About from "./pages/About";
import OfflineHomeworkHelp from "./pages/OfflineHomeworkHelp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flashcards/:subject" element={<Flashcards />} />
        <Route path="/quiz/:subject" element={<Quiz />} />
        <Route path="/about" element={<About />} />
        <Route path="/offline-homework-help" element={<OfflineHomeworkHelp />} />
      </Routes>
    </Router>
  );
}

export default App;
