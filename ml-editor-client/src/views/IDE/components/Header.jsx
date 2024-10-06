import PlayIcon from '../../../assets/play.svg';
import StopIcon from '../../../assets/stop.svg';
import { MessageTypes, dispatchMessage } from '../../../utils/Message';

const startSketch = () => {
  dispatchMessage({
    type: MessageTypes.SKETCH,
    payload: {
      files: [{ id: '1234123', name: 'index.html', content: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
          ${Math.random()}
        </body>
        </html>`}],
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
        onClick={() => {
          startSketch();
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