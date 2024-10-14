import supabase from "../../supabaseClient";
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label>邮箱</Label>
        <Input
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />
      </div>
      <div>
        <Label>密码</Label>
        <Input
          type="password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />
      </div>
      <Button type="submit">提交</Button>
    </form>
  )
}