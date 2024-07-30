import { useState } from 'react'
import './App.css'
import FlightStatus from './components/FlightStatus'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FlightStatus/>
    </>
  )
}

export default App
