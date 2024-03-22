import { createBrowserRouter } from "react-router-dom";
import { LK_ACCUEIL } from "./endpoints";
import Accueil from "../pages/Accueil";

const router = createBrowserRouter([
  {
    path : LK_ACCUEIL,
    element : <Accueil/>
  }
])

export default router;