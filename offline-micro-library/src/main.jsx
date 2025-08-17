// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Flashcards from './pages/Flashcards'
import Quiz from './pages/Quiz'
import './index.css'
import HomeworkHelp from "./pages/HomeworkHelp.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flashcards/:subject" element={<Flashcards />} />
        <Route path="/quiz/:subject" element={<Quiz />} />
        <Route path="/offline-homework-help" element={<HomeworkHelp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
