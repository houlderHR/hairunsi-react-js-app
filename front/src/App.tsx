import { Outlet, RouterProvider } from 'react-router-dom';
import router from './routes/route.tsx';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Outlet />
    </>
  );
}

export default App;
