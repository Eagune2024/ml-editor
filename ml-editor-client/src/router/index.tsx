import { createBrowserRouter } from "react-router-dom";
import { Router } from "@remix-run/router";
import IDEView from '../views/IDE';

const router: Router = createBrowserRouter([
  {
    path: "/",
    element: <IDEView />,
  },
]);

export default router