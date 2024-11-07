import { useContext } from 'react';
import classNames from 'classnames';
import FileNode from './FileNode';
import { FilesContext } from '../IDEView';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function SideBar() {
  const { filesValue } = useContext(FilesContext);
  const rootFile = filesValue.files.find((file) => file.name === 'root')
  
  const sidebarClass = classNames({
    sidebar: true,
  });

  return (
    <section className={sidebarClass}>
      <header
        className="sidebar__header"
      >
        <h3 className="sidebar__title">
          <span>项目文件</span>
        </h3>
        <div className="sidebar__icons">
          <button
            className="sidebar__add"
            tabIndex="0"
          >
            +
          </button>
          <ul className="sidebar__project-options">
            <li>
              <Dialog>
                <DialogTrigger asChild>
                  <button>新建文件夹</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>新建文件夹</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      文件夹名称
                    </Label>
                    <Input
                      id="username"
                      defaultValue="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">保存</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </li>
            <li>
              <button>新建文件</button>
            </li>
          </ul>
        </div>
      </header>
      { rootFile ? <FileNode files={filesValue.files} id={rootFile.id} /> : <></>}
    </section>
  )
}