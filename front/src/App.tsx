import { Outlet, RouterProvider } from 'react-router-dom';
import './App.scss';

import router from './routes/route';
import NavBar from './shared/authenticated/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <RouterProvider router={router}></RouterProvider>
      <Outlet />
    </>
  );
}

export default App;
