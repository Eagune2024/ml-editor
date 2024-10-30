import { Link } from "react-router-dom";

export default function MenuBar () {
  return (
    <div>
      <div className="logo"></div>
      <div><Link to="ppt">演示</Link></div>
      <div><Link to="note">笔记</Link></div>
      <div><Link to="demo">代码</Link></div>
    </div>
  )
}