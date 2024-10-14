import { useAppContext } from "../../context/appContext";
import Auth from "../../components/auth/auth";
import Projects from "./components/Projects";

export default function UserView () {
  const { session } = useAppContext()
  return (
    session ? <Projects /> : <Auth />
  )
}