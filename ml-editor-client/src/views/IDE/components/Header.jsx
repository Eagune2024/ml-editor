import { useContext } from 'react';
import { MessageTypes, dispatchMessage } from '../../../utils/Message';
import { FilesContext } from '../IDEView';
import { useNavigate } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Link } from "react-router-dom";
import BoomIcon from '../../../assets/Boom.svg';

const startSketch = (files) => {
  dispatchMessage({
    type: MessageTypes.SKETCH,
    payload: {
      files,
      basePath: window.location.pathname,
    }
  });
  dispatchMessage({
    type: MessageTypes.START
  });
}

export default function Header({ syncFileContent, saveProject }) {
  const { filesValue } = useContext(FilesContext);

  const navigate = useNavigate();
  const toHome = () => {
    navigate('/')
  }

  return (
    <>
      <Menubar className="rounded-none border-0 border-b px-4 h-12 shadow-none">
        <MenubarMenu>
          <MenubarTrigger className="relative">项目</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={saveProject}>
              保存项目<MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="relative">文件</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              新建文件
            </MenubarItem>
            <MenubarItem>
              新建文件夹
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            运行
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              onClick={() => {
              syncFileContent();
              startSketch(filesValue.files);
            }}>
              开始运行
            </MenubarItem>
            <MenubarItem>
              停止运行
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <div className='flex-1'></div>
        <MenubarMenu>
          <Link to="/" className="focus:shadow-none">
            <div className="flex justify-center w-14"><BoomIcon className="w-12 h-6" /></div>
          </Link>
        </MenubarMenu>
      </Menubar>
    </>
  );
}