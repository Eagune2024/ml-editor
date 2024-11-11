import MenuBar from "./components/menuBar";
import { Outlet } from "react-router-dom";

export default function HomeView () {
  return (
    <div className="flex flex-col h-full">
      <MenuBar />
      <Outlet />
    </div>
  )
}