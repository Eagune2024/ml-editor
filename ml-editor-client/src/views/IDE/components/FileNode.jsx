import React from 'react';
import classNames from 'classnames';

// class FileNode extends React.Component {
//   constructor(props) {
//     super(props);

//     const file = props.files.find((file) => file.id === props.id) || {
//       name: 'test',
//       fileType: 'file'
//     };
//     this.state = {
//       file
//     };
//   }

//   renderChild = (childId) => (
//     <li key={childId}>
//       <FileNode
//         files={this.props.files}
//         id={childId}
//         parentId={this.props.id}
//       />
//     </li>
//   );

//   render() {
//     const isFile = this.state.file.fileType === 'file';
//     const isFolder = this.state.file.fileType === 'folder';
//     const isRoot = this.state.file.name === 'root';

//     const itemClass = classNames({
//       'sidebar__root-item': this.state.file.name === 'root',
//       'sidebar__file-item': this.state.file.name !== 'root',
//     });

//     console.log(isFile, isFolder, isRoot)

//     return (
//       <div className={itemClass}>
//         {!isRoot && (
//           <div
//             className="file-item__content"
//           >
//             <span className="file-item__spacer"></span>
//             {this.state.file.name}
//           </div>
//         )}
//         {this.state.file.children && (
//           <ul className="file-item__children">
//             {this.state.file.children.map(this.renderChild)}
//           </ul>
//         )}
//       </div>
//     );
//   }
// }

// export default FileNode;

export default function FileNode ({files, id}) {
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
          {file.name}
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