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