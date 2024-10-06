import { createBrowserRouter } from "react-router-dom";
import IDEView from '../views/IDE';
import PreviewView from "../views/Preview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IDEView />,
  },
  {
    path: "/editor",
    element: <IDEView />,
  },
  {
    path: '/preview',
    name: 'preview',
    element: <PreviewView />,
  }
]);

export default router