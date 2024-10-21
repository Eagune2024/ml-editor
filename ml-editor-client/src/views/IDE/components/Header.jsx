import { useContext } from 'react';
import PlayIcon from '../../../assets/play.svg';
import StopIcon from '../../../assets/stop.svg';
import { MessageTypes, dispatchMessage } from '../../../utils/Message';
import { FilesContext } from '..';
import { useNavigate } from "react-router-dom";

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

export default function Header({ syncFileContent, saveProject }) {
  const { filesValue } = useContext(FilesContext);

  const navigate = useNavigate();
  const toHome = () => {
    navigate('/')
  }

  return (
    <>
      <div className="nav">
        <button onClick={toHome}>返回首页</button>
        <button onClick={saveProject}>保存项目</button>
      </div>
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
    </>
  );
}