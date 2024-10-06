import React, { useEffect, useState } from 'react';
import { MessageTypes, listen } from "../../utils/Message";
import EmbedFrame from './components/EmbedFrame';

export default function PreviewView () {
  const [files, setFiles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [basePath, setBasePath] = useState('');

  function handleMessageEvent(message) {
    const { type, payload } = message;
    switch (type) {
      case MessageTypes.SKETCH:
        setFiles(payload.files);
        setBasePath(payload.basePath);
        break;
      case MessageTypes.START:
        setIsPlaying(true);
        break;
      case MessageTypes.STOP:
        setIsPlaying(false);
        break;
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
    <div>
      <EmbedFrame
        isPlaying={isPlaying}
        files={files}
        basePath={basePath}
      />
    </div>
  )
}