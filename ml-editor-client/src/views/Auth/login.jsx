import supabase from "../../supabaseClient";
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (!error) navigate("/")
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="mt-6">
          <div>
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div>
            <Label htmlFor="password">密码</Label>
            <Input
              id="password"
              type="password"
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">登陆</Button>
        </CardFooter>
      </form>
    </Card>
  )
}