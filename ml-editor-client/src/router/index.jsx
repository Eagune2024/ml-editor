import { createBrowserRouter } from "react-router-dom";
import IDEView from '../views/IDE';

const router = createBrowserRouter([
  {
    path: "/",
    element: <IDEView />,
  },
]);

export default router