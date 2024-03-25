import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { LK_home } from "./endpoints";

const routes = createBrowserRouter(
  [
    {
      path : LK_home,
      element : <Home />
    }
  ]
)

export default routes;