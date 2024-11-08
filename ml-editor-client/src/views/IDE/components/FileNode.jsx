import React, { useContext } from 'react';
import classNames from 'classnames';
import { FilesContext } from '../IDEView';
import { Button } from "@/components/ui/button"
import JsIcon from '../../../assets/editor/js.svg';
import CssIcon from '../../../assets/editor/css.svg';
import HtmlIcon from '../../../assets/editor/html.svg';

export default function FileNode ({files, id}) {
  const { filesValue, setFileValue } = useContext(FilesContext);
  const file = files?.find((file) => file.id === id) || {
    name: 'test',
    fileType: 'file'
  };
  const isFile = file.fileType === 'file';
  const isFolder = file.fileType === 'folder';
  const isRoot = file.name === 'root';
  const isCurrent = filesValue.selectedFile === file.id;

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
        <div className="file-item__content">
          <span className="file-item__spacer"></span>
          <Button variant={ isCurrent ? 'secondary' : 'ghost' } className="w-full justify-start" onClick={handleFileClick}>
            { file.fileContentType === 'html' && <HtmlIcon className="w-4 h-4 fill-amber-600 mr-2" />}
            { file.fileContentType === 'css' && <CssIcon className="w-4 h-4 fill-cyan-600 mr-2" />}
            { file.fileContentType === 'javascript' && <JsIcon className="w-4 h-4 fill-yellow-300 mr-2" />}
            { file.name }
          </Button>
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