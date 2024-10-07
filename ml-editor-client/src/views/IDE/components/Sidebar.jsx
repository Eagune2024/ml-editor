import classNames from 'classnames';
import FileNode from './FileNode';
import objectID from 'bson-objectid';

const initialFiles = () => {
  const a = objectID().toHexString();
  const b = objectID().toHexString();
  const c = objectID().toHexString();
  const r = objectID().toHexString();
  return [
    {
      name: 'root',
      id: r,
      _id: r,
      children: [b, a, c],
      fileType: 'folder',
      content: ''
    },
    {
      name: 'sketch.js',
      content: 'defaultSketch',
      id: a,
      _id: a,
      isSelectedFile: true,
      fileType: 'file',
      children: [],
      filePath: ''
    },
    {
      name: 'index.html',
      content: 'defaultHTML',
      id: b,
      _id: b,
      fileType: 'file',
      children: [],
      filePath: ''
    },
    {
      name: 'style.css',
      content: 'defaultCSS',
      id: c,
      _id: c,
      fileType: 'file',
      children: [],
      filePath: ''
    }
  ];
};

export default function SideBar() {
  const isAuthenticated = false;
  const files = initialFiles();
  const rootFile = files.find((file) => file.name === 'root')
  
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
            {isAuthenticated && (
              <li>
                <button>上传文件</button>
              </li>
            )}
          </ul>
        </div>
      </header>
      <FileNode files={files} id={rootFile.id} />
    </section>
  )
}