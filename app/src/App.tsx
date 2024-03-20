import { lazy } from 'react'
import {
  BrowserRouter,
  Routes, 
  Route
} from 'react-router-dom'
import './App.css'

const Accueil = lazy(() => import('./components/Accueil/Accueil'))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
