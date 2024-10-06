const frames = {};
let frameIndex = 1;
let listener = null;

export function registerFrame(newFrame, newOrigin) {
  const frameId = frameIndex;
  frameIndex += 1;
  frames[frameId] = { frame: newFrame, origin: newOrigin };
  return () => {
    delete frames[frameId];
  };
}

export function dispatchMessage(message) {
  if (!message) return;

  const rawMessage = JSON.parse(JSON.stringify(message));
  Object.keys(frames).forEach((frameId) => {
    const { frame, origin } = frames[frameId];
    console.log(frame)
    if (frame && frame.postMessage) {
      frame.postMessage(rawMessage, origin);
    }
  });
}

export function listen(callback) {
  listener = callback;
  return () => {
    listener = null;
  };
}

function eventListener(e) {
  const { data } = e;
  if (data) {
    if (listener) listener(data);
  }
}
window.addEventListener('message', eventListener);