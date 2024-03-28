import { Outlet, RouterProvider } from 'react-router-dom';
import router from './routes/route';

const App = () => (
  <>
    <RouterProvider router={router} />
    <Outlet />
  </>
);

export default App;
