import { useAppContext } from "../../context/appContext";
import Auth from "../../components/auth/auth";
import MenuBar from "./components/menuBar";

const Home = function () {
  return (<><MenuBar /></>)
}

export default function UserView () {
  const { session } = useAppContext()
  return (
    session ? <Home /> : <Auth />
  )
}