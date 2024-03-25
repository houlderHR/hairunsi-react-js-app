import { createBrowserRouter } from 'react-router-dom';
import { LK_HOME } from './paths';
import Home from '../pages/Home';

const routes = createBrowserRouter([
  {
    path: LK_HOME,
    element: <Home />,
  },
]);

export default routes;
