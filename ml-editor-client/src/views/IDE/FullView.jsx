import React, { useState, useEffect, useRef } from 'react';
import PreviewFrame from './components/PreviewFrame';
import RootPage from "../../layout/RootPage";
import { useParams } from 'react-router-dom';
import supabase from '../../supabaseClient';
import { listen } from '../../utils/Message';
import useInterval from '../../utils/useInterval';
import { MessageTypes, dispatchMessage } from '../../utils/Message';

export default function FullView () {
  const [files, setFiles] = useState([]);
  const [isRendered, setIsRendered] = useState(false);
  const params = useParams();

  const dispatch = () => {
    if (files.length) {
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
    await supabase.from('Project').select().eq('id', projectId).then((res) => {
      if (res.data.length > 0) {
        const files = res.data[0].files
        setFiles(files);
      }
    })
  }

  useEffect(() => {
    getProject(params.project_id)
  }, [params]);

  const clearInterval = useInterval(() => {
    dispatchMessage({ type: MessageTypes.REGISTER });
  }, 100);
  if (isRendered) {
    clearInterval();
  }
  if (isRendered && files.length) {
    dispatch();
  }

  function handleMessageEvent(message) {
    if (message.type === MessageTypes.REGISTER) {
      if (!isRendered) {
        setIsRendered(true);
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