import supabase from "../../supabaseClient";

export default function Auth() {
  return (
    <form>
      <div>
        <Label>邮箱</Label>
        <Input />
      </div>
      <div>
        <Label>密码</Label>
        <Input type="password" />
      </div>
      <Button>提交</Button>
    </form>
  )
}