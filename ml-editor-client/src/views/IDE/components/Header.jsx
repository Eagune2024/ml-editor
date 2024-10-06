import PlayIcon from '../../../assets/play.svg';
import StopIcon from '../../../assets/stop.svg';
import { MessageTypes, dispatchMessage } from '../../../utils/Message';

const startSketch = () => {
  dispatchMessage({
    type: MessageTypes.SKETCH,
    payload: {
      files: [{ name: 'sketch.js', content: '// Your sketch code here' }],
      basePath: window.location.pathname,
    }
  });
  dispatchMessage({
    type: MessageTypes.START
  });
}

export default function Header() {
  return (
    <div className="toolbar">
      <button
        className='toolbar__play-button'
      >
        <PlayIcon focusable="false" aria-hidden="true" onClick={() => {
          startSketch();
        }} />
      </button>
      <button
        className='toolbar__play-button'
      >
        <StopIcon focusable="false" aria-hidden="true" />
      </button>
    </div>
  );
}