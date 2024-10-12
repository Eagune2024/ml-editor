import Auth from "../../components/auth/auth";
import { useAppContext } from "../../context/appContext";

export default function UserView () {
  const { session } = useAppContext()
  return (
    session ? <>登录</> : <Auth />
  )
}