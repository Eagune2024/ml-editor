import { useContext } from 'react';
import classNames from 'classnames';
import FileNode from './FileNode';
import { FilesContext } from '../IDEView';

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
          <span>EXPLORER</span>
        </h3>
      </header>
      { rootFile ? <FileNode files={filesValue.files} id={rootFile.id} /> : <></>}
    </section>
  )
}