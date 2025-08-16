import { useState } from 'react'
import questions from '../data/questions.json'

export default function Quiz() {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const q = questions[index]

  const handleAnswer = (option) => {
    setSelected(option)
    if(option === q.answer) setScore(score + 1)
    setTimeout(() => {
      setSelected(null)
      setIndex((prev) => (prev + 1) % questions.length)
    }, 500)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h2 className="text-xl">{q.question}</h2>
      <div className="flex flex-col space-y-2">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            className={`px-4 py-2 rounded ${selected === opt ? 'bg-gray-300' : 'bg-green-400'}`}
          >
            {opt}
          </button>
        ))}
      </div>
      <p>Score: {score}</p>
    </div>
  )
}
