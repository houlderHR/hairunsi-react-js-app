import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1 className="text-3xl font-bold underline text-red-600">
      Simple React Typescript Tailwind Sample
    </h1>    </>
  )
}

export default App
