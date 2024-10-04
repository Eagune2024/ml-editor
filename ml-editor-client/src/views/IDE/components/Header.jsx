import PlayIcon from '../../../assets/play.svg';
import StopIcon from '../../../assets/stop.svg';

export default function Header() {
  return (
    <div className="toolbar">
      <button
        className='toolbar__play-button'
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