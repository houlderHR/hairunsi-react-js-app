import { createBrowserRouter } from 'react-router-dom';
import { LK_HOME, LK_ACCUEIL } from './paths';
import Home from '../pages/Home';
import Accueil from '../pages/Accueil';

const routes = createBrowserRouter([
  {
    path: LK_HOME,
    element: <Home />,
  },
  {
    path: LK_ACCUEIL,
    element: <Accueil />,
  },
]);

export default routes;
