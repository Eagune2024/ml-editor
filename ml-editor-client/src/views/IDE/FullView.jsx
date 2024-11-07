import React, { useState, useEffect, useRef } from 'react';
import PreviewFrame from './components/PreviewFrame';
import RootPage from "../../layout/RootPage";
import { useParams } from 'react-router-dom';
import supabase from '../../supabaseClient';
import { listen } from '../../utils/Message';
import { MessageTypes, dispatchMessage } from '../../utils/Message';

export default function FullView () {
  const [files, setFiles] = useState([]);
  const [isRendered, setIsRendered] = useState(false);
  const params = useParams();

  const dispatch = () => {
    if (isRendered) {
      dispatchMessage({
        type: MessageTypes.SKETCH,
        payload: {
          files,
          basePath: window.location.pathname,
        }
      });
      dispatchMessage({
        type: MessageTypes.START
      });
    }
  }
  
  const getProject = async (projectId) => {
    await supabase.from('Project').select().eq('id', params.project_id).then((res) => {
      if (res.data.length > 0) {
        const files = res.data[0].files
        setFiles(files);
        dispatch();
      }
    })
  }

  useEffect(() => {
    getProject()
  }, [params]);

  function handleMessageEvent(message) {
    if (message.type === MessageTypes.REGISTER) {
      if (!isRendered) {
        setIsRendered(true);
        dispatch();
      }
    }
  }

  useEffect(() => {
    const unsubscribe = listen(handleMessageEvent);
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return (
    <RootPage>
      <main className="preview-frame-holder">
        <PreviewFrame />
      </main>
    </RootPage>
  );
}