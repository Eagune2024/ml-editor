import { createBrowserRouter } from "react-router-dom";
import { Router } from "@remix-run/router";

const router: Router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

export default router