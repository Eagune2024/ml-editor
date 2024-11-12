import React, { useRef, useEffect } from 'react';
import { registerFrame } from '../../../utils/Message';

export default function PreviewFrame() {
  const iframe = useRef();
  useEffect(() => {
    const unsubscribe = registerFrame(iframe.current.contentWindow, 'http://localhost:5173');
    return () => {
      unsubscribe();
    };
  });

  const frameUrl = 'http://localhost:5173/preview';
  const sandboxAttributes = `allow-forms allow-modals allow-pointer-lock allow-popups \
    allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads`;
  const allow = `accelerometer; ambient-light-sensor; autoplay; bluetooth; camera; encrypted-media; geolocation; gyroscope; \
    hid; microphone; magnetometer; midi; payment; usb; serial; vr; xr-spatial-tracking`;

  return (
    <iframe
      className='min-w-full	min-h-full relative border-none'
      title="sketch preview"
      src={frameUrl}
      sandbox={sandboxAttributes}
      allow={allow}
      ref={iframe}
    />
  );
}