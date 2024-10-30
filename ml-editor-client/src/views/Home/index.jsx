import { useAppContext } from "../../context/appContext";
import Auth from "../../components/auth/auth";
import MenuBar from "./components/menuBar";
import { Outlet } from "react-router-dom";

const Home = function () {
  return (
    <>
      <MenuBar />
      <Outlet />
    </>
  )
}

export default function HomeView () {
  const { session } = useAppContext()
  return (
    session ? <Home /> : <Auth />
  )
}