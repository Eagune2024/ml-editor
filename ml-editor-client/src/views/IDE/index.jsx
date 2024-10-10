import React, { useState } from 'react';
import RootPage from "../../layout/RootPage";
import SplitPane from 'react-split-pane';
import SideBar from "./components/Sidebar";
import Editor from "./components/Editor";
import Console from "./components/Console";
import PreviewFrame from "./components/PreviewFrame";
import Header from './components/Header';
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
export const FilesContext = React.createContext();

export default function IDEView () {
  const [filesValue, setFileValue] = useState( {
    files: initialFiles(),
    selectedFile: null
  });

  return (
    <FilesContext.Provider value={{ filesValue, setFileValue }}>
      <RootPage>
        <Header />
        <main className="editor-preview-container">
          <SplitPane
            split='vertical'
            minSize={150}
          >
            <SideBar />
            <SplitPane
              split="vertical"
              defaultSize="50%"
              resizerStyle={{
                borderLeftWidth: '2px',
                borderRightWidth: '2px',
                width: '2px',
                margin: '0px 0px'
              }}
            >
              <SplitPane
                split="horizontal"
                primary="second"
                className="editor-preview-subpanel"
              >
                <Editor />
                <Console />
              </SplitPane>
              <section className="preview-frame-holder">
                <header className="preview-frame__header">
                  <h2 className="preview-frame__title">预览</h2>
                </header>
                <div className="preview-frame__content">
                  <PreviewFrame />
                </div>
              </section>
            </SplitPane>
          </SplitPane>
        </main>
      </RootPage>
    </FilesContext.Provider>
  )
}