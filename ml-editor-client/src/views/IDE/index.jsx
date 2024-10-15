import React, { useState, useEffect, useRef } from 'react';
import RootPage from "../../layout/RootPage";
import SplitPane from 'react-split-pane';
import SideBar from "./components/Sidebar";
import Editor from "./components/Editor";
import Console from "./components/Console";
import PreviewFrame from "./components/PreviewFrame";
import Header from './components/Header';
import { initialFiles } from './bootstrap';
import { useSearchParams } from 'react-router-dom';
import supabase from '../../supabaseClient';

export const FilesContext = React.createContext();

export default function IDEView () {
  const [searchParams] = useSearchParams();
  const [filesValue, setFileValue] = useState({
    files: [],
    selectedFile: null
  });
  const editorRef = useRef();
  const syncFileContent = () => {
    const curFile = filesValue.files?.find((file) => file.id === filesValue.selectedFile)
    if (curFile) {
      curFile.content = editorRef.current?.getContent()
    }
    setFileValue(filesValue)
  }

  const getProject = async () => {
    await supabase.from('Project').select('*').eq('id', projectId).then((res) => {
      if (res.data.length > 0) {
        const files = res.data[0].files
        setFileValue({
          files,
          selectedFile: files[0].id
        })
      }
    })
  }

  const saveProject = async () => {
    await supabase.from('Project').update({
      id: projectId,
      files: filesValue.files
    })
  }
  
  useEffect(() => {
    const projectId = searchParams.get('projectId')
    if (projectId) {
      getProject()
    } else {
      const files = initialFiles();
      setFileValue({
        files: files,
        selectedFile: files[0].id
      })
    }
  }, [searchParams]);

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