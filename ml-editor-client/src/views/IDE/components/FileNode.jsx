import React, { useContext } from 'react';
import classNames from 'classnames';
import { FilesContext } from '../IDEView';

export default function FileNode ({files, id}) {
  const { filesValue, setFileValue } = useContext(FilesContext);
  const file = files?.find((file) => file.id === id) || {
    name: 'test',
    fileType: 'file'
  };
  const isFile = file.fileType === 'file';
  const isFolder = file.fileType === 'folder';
  const isRoot = file.name === 'root';

  const itemClass = classNames({
    'sidebar__root-item': file.name === 'root',
    'sidebar__file-item': file.name !== 'root',
  });

  const handleFileClick = (e) => {
    e.stopPropagation();
    setFileValue({
      ...filesValue,
      selectedFile: file.id
    });
  }

  const renderChild = (childId) => (
    <li key={childId}>
      <FileNode
        files={files}
        id={childId}
      />
    </li>
  );

  return (
    <div className={itemClass}>
      {!isRoot && (
        <div
          className="file-item__content"
        >
          <span className="file-item__spacer"></span>
          
          <button
            className="sidebar__file-item-name"
            onClick={handleFileClick}
          >
            {file.name}
          </button>
        </div>
      )}
      {file.children && (
        <ul className="file-item__children">
          {file.children.map(renderChild)}
        </ul>
      )}
    </div>
  );
}