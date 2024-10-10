import React, { useState, useRef } from 'react';
import RootPage from "../../layout/RootPage";
import SplitPane from 'react-split-pane';
import SideBar from "./components/Sidebar";
import Editor from "./components/Editor";
import Console from "./components/Console";
import PreviewFrame from "./components/PreviewFrame";
import Header from './components/Header';
import { initialFiles } from './bootstrap';

export const FilesContext = React.createContext();

export default function IDEView () {
  const [filesValue, setFileValue] = useState({
    files: initialFiles(),
    selectedFile: null
  });
  const editorRef = useRef();
  const syncFileContent = () => {
    const curFile = filesValue.files?.find((file) => file.id === filesValue.selectedFile)
    curFile.content = editorRef.current.getContent()
    setFileValue(filesValue)
  }

  return (
    <FilesContext.Provider value={{ filesValue, setFileValue }}>
      <RootPage>
        <Header syncFileContent={syncFileContent} />
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
                <Editor ref={editorRef} />
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