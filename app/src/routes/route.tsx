import { createBrowserRouter } from "react-router-dom";

import Accueil from "../pages/Accueil/Accueil";

const routes = createBrowserRouter([
    {
        path : "/accueil",
        element : <Accueil />
    }
]
)

export default routes;