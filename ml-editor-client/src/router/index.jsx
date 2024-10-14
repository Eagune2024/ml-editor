import { Navigate, createBrowserRouter } from "react-router-dom";
import IDEView from '../views/IDE';
import PreviewView from "../views/Preview";
import UserView from "../views/User";

const router = createBrowserRouter([
  {
    path: "/",
    name: 'home',
    element: <Navigate to="editor" replace />
  },
  {
    path: "/editor",
    name: 'editor',
    element: <IDEView />,
  },
  {
    path: '/user',
    name: 'user',
    element: <UserView />,
  },
  {
    path: '/preview',
    name: 'preview',
    element: <PreviewView />,
  }
]);

export default router