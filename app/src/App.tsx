import {
  Outlet,
  RouterProvider
} from 'react-router-dom'
import './App.css'

import router from './routes/router'
import NavBar from './shared/authentificated/NavBar'

function App() {
  return (
    <>
      <NavBar/>
      <RouterProvider router={router}>
      </RouterProvider>
      <Outlet/>
    </>
  )
}

export default App
