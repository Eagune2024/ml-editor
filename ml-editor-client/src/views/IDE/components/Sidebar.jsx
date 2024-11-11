import { useContext } from 'react';
import classNames from 'classnames';
import FileNode from './FileNode';
import { FilesContext } from '../IDEView';

export default function SideBar() {
  const { filesValue } = useContext(FilesContext);
  const rootFile = filesValue.files.find((file) => file.name === 'root')

  return (
    <section className='flex flex-col w-full h-full'>
      <header className="h-10 flex pl-2 items-center border-x-0 border border-black">
        <h3>EXPLORER</h3>
      </header>
      { rootFile ? <FileNode files={filesValue.files} id={rootFile.id} /> : <></>}
    </section>
  )
}