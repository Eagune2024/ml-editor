import React, { useEffect } from 'react';
import { listen } from "../../utils/Message";

export default function PreviewView () {
  
  function handleMessageEvent(message) {
    const { type, payload } = message;
    switch (type) {
      case MessageTypes.SKETCH:
        // dispatch(setFiles(payload.files));
        // setBasePath(payload.basePath);
        // setTextOutput(payload.textOutput);
        // setGridOutput(payload.gridOutput);
        break;
      // case MessageTypes.START:
      //   setIsPlaying(true);
      //   break;
      // case MessageTypes.STOP:
      //   setIsPlaying(false);
      //   break;
      // case MessageTypes.REGISTER:
      //   dispatchMessage({ type: MessageTypes.REGISTER });
      //   break;
      // case MessageTypes.EXECUTE:
      //   dispatchMessage(payload);
      //   break;
      default:
        break;
    }
  }
  
  useEffect(() => {
    const unsubscribe = listen(handleMessageEvent);
    return function cleanup() {
      unsubscribe();
    };
  });

  return (
    <div>预览页面</div>
  )
}