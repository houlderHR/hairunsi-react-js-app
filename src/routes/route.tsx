import { Navigate, createBrowserRouter } from "react-router-dom";
import UserManager from "../components/pages/Authenticated/UserManager";
import UserManagerType from "../components/pages/Authenticated/UserManager/Views/UserManagerType";

const router = createBrowserRouter([
  {
    path: "/gestion-utilisateur",
    element: <UserManager />,
    children: [
      {
        path: "type",
        element: <UserManagerType />
      },
      {
        path: "utilisateur",
        element: <div>Utilisateurs</div>
      },
      {
        path: "role",
        element: <div>Rôle</div>
      },
      {
        path: "*",
        element: <Navigate to="type" replace />
      }
    ]
  },
]);

export default router;