import { Navigate, createBrowserRouter } from "react-router-dom";
import IDEView from '../views/IDE/IDEView';
import FullView from '../views/IDE/FullView';
import PreviewView from "../views/Preview";
import UserView from "../views/User";
import HomeView from "../views/Home";
import PPTView from "../views/Home/PPT";
import DemoView from "../views/Home/Demo";
import NoteView from "../views/Home/Note";

const router = createBrowserRouter([
  {
    path: "/",
    name: 'home',
    element: <HomeView />,
    children: [
      {
        index: true,
        element: <Navigate to="ppt" />
      },
      {
        path: "ppt",
        name: 'ppt',
        element: <PPTView />,
      },
      {
        path: "demo",
        name: 'demo',
        element: <DemoView />,
      },
      {
        path: "note",
        name: 'note',
        element: <NoteView />,
      },
    ]
  },
  {
    path: "/editor",
    name: 'editor',
    element: <IDEView />,
  },
  {
    path: "/project/:project_id",
    name: 'project',
    element: <FullView />,
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