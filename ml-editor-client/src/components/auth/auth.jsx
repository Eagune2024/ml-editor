import { useState } from 'react'
import Login from './login'
import Register from './register'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    isLogin
    ?
    <>
      <button
        onClick={() => {
          setIsLogin(false)
        }}
      >
        去注册
      </button>
      <Login />
    </>
    :
    <>
      <button
        onClick={() => {
          setIsLogin(true)
        }}
      >
        去登录
      </button>
      <Register />
    </>
  )
}