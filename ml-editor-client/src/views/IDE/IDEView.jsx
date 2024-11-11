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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

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

  const getProject = async (projectId) => {
    await supabase.from('Project').select().eq('id', projectId).then((res) => {
      if (res.data.length > 0) {
        const files = res.data[0].files
        setFileValue({
          files,
          selectedFile: files.filter((file) => file.name === 'index.html')[0].id
        })
      }
    })
  }

  const saveProject = async () => {
    const projectId = searchParams.get('projectId')
    syncFileContent()
    await supabase.from('Project').update({
      files: filesValue.files
    }).eq('id', projectId).select()
  }
  
  useEffect(() => {
    const projectId = searchParams.get('projectId')
    if (projectId) {
      getProject(projectId)
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
      <div className='w-screen h-screen flex flex-col rounded-xl border border-black overflow-hidden'>
        <Header syncFileContent={syncFileContent} saveProject={saveProject} />
        <ResizablePanelGroup direction="horizontal" className="h-full overflow-hidden">
          <ResizablePanel defaultSize={50}>
            <SideBar />
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-black" />
          <ResizablePanel defaultSize={150} className="relative">
            <Editor ref={editorRef}  className="relative"/>
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-black" />
          <ResizablePanel defaultSize={150}>
            <section className="flex flex-col h-full">
              <header className="h-10 flex pl-2 items-center border-x-0 border border-black">
                <h2>预览</h2>
              </header>
              <div className='w-full relative flex-1'>
                <PreviewFrame />
              </div>
            </section>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </FilesContext.Provider>
  )
}