import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-4xl font-bold">Offline Micro Library</h1>
      <div className="flex flex-col space-y-2">
        <Link to="/flashcards" className="px-4 py-2 bg-blue-500 text-white rounded">Flashcards</Link>
        <Link to="/quiz" className="px-4 py-2 bg-green-500 text-white rounded">Quiz</Link>
      </div>
    </div>
  )
}
