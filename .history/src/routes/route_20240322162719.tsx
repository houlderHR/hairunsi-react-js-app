import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import { LK_home } from "./links";

const routes = createBrowserRouter(
  [
    {
      path : LK_home,
        element : <Home />
    }
  ]
)

export default routes;