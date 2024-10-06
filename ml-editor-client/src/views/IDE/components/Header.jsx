import PlayIcon from '../../../assets/play.svg';
import StopIcon from '../../../assets/stop.svg';
import { dispatchMessage } from '../../../utils/Message';

const startSketch = () => {
  // TODO: start sketch
  dispatchMessage({
    // type: MessageTypes.SKETCH,
    payload: {
      // files: state.files,
      basePath: window.location.pathname,
      // gridOutput: state.preferences.gridOutput,
      // textOutput: state.preferences.textOutput
    }
  });
  // dispatchMessage({
  //   type: MessageTypes.START
  // });
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