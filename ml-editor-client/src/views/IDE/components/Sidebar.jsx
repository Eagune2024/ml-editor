export default function SideBar() {
  const isAuthenticated = false
  
  return (
    <section>
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
    </section>
  )
}