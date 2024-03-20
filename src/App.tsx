import Navbar from "./components/Navbar"
import GestionUserType from "./pages/GestionUserType"

function App() {

  return (
    <>
      <div className="min-h-screen bg-gray-50 h-full">
        <Navbar />
        <GestionUserType />
      </div>
    </>
  )
}

export default App
