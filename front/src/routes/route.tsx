import { createBrowserRouter } from "react-router-dom";
import { LK_home } from "./endpoints";
import Home from "../pages/home";

const routes = createBrowserRouter(
  [
    {
      path : LK_home,
      element : <Home />
    }
  ]
)

export default routes;