import { useContext } from 'react';
import PlayIcon from '../../../assets/play.svg';
import StopIcon from '../../../assets/stop.svg';
import { MessageTypes, dispatchMessage } from '../../../utils/Message';
import { FilesContext } from '..';

const startSketch = (files) => {
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

export default function Header({ syncFileContent }) {
  const { filesValue } = useContext(FilesContext);
  return (
    <div className="toolbar">
      <button
        className='toolbar__play-button'
        onClick={() => {
          syncFileContent();
          startSketch(filesValue.files);
        }}
      >
        <PlayIcon focusable="false" aria-hidden="true" />
      </button>
      <button
        className='toolbar__play-button'
      >
        <StopIcon focusable="false" aria-hidden="true" />
      </button>
    </div>
  );
}