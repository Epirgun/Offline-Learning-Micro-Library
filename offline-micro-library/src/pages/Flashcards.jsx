import { useState } from 'react'
import questions from '../data/questions.json'

export default function Flashcards() {
  const [current, setCurrent] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const card = questions[current]

  const nextCard = () => {
    setShowAnswer(false)
    setCurrent((prev) => (prev + 1) % questions.length)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div
        className="w-96 h-64 flex items-center justify-center border rounded-lg cursor-pointer p-4 text-center bg-gray-100"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer ? card.answer : card.question}
      </div>
      <button onClick={nextCard} className="px-4 py-2 bg-blue-500 text-white rounded">
        Next
      </button>
    </div>
  )
}
