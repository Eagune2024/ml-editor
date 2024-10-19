import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Login from "./login"
import Register from "./register"

export default function AuthForm() {
  return (
    <Tabs defaultValue="register" className="w-[400px] h-[300px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="register">注册</TabsTrigger>
        <TabsTrigger value="login">登陆</TabsTrigger>
      </TabsList>
      <TabsContent value="register">
        <Register />
      </TabsContent>
      <TabsContent value="login">
        <Login />
      </TabsContent>
    </Tabs>
  )
}