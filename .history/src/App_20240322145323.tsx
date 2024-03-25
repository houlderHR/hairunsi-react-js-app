import {
  Outlet,
  RouterProvider
} from 'react-router-dom'
import './App.scss'
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