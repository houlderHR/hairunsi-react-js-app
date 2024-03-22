import {
  Outlet,
  RouterProvider
} from 'react-router-dom'
import './App.css'

import routes from './routes/route'

function App() {
  return (
    <>
      <RouterProvider router={routes}>
      </RouterProvider>
      <Outlet/>
    </>
  )
}

export default App
