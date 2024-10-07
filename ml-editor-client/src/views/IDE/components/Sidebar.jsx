import { useContext } from 'react';
import classNames from 'classnames';
import FileNode from './FileNode';
import { FilesContext } from '..';

export default function SideBar() {
  const { filesValue, setFileValue } = useContext(FilesContext);
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
              <button>新建文件夹</button>
            </li>
            <li>
              <button>新建文件</button>
            </li>
          </ul>
        </div>
      </header>
      <FileNode files={filesValue.files} id={rootFile.id} />
    </section>
  )
}