import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { registerFrame } from '../../../utils/Message';

const Frame = styled.iframe`
  min-height: 100%;
  min-width: 100%;
  position: ${(props) => (props.fullView ? 'relative' : 'absolute')};
  border-width: 0;
`;

export default function PreviewFrame({ fullView, isOverlayVisible }) {
  const iframe = useRef();
  useEffect(() => {
    const unsubscribe = registerFrame(iframe.current.contentWindow, 'http://localhost:5173');
    return () => {
      unsubscribe();
    };
  });

  const frameUrl = 'http://localhost:5173/preview';
  const sandboxAttributes = `allow-forms allow-modals allow-pointer-lock allow-popups 
    allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads`;
  const allow = `accelerometer; ambient-light-sensor; autoplay; bluetooth; camera; encrypted-media; geolocation; gyroscope; \
    hid; microphone; magnetometer; midi; payment; usb; serial; vr; xr-spatial-tracking`;

  return (
    <>
      <div
        className="preview-frame-overlay"
        style={{ display: isOverlayVisible ? 'block' : 'none' }}
      />
      <Frame
        title="sketch preview"
        src={frameUrl}
        sandbox={sandboxAttributes}
        allow={allow}
        allowFullScreen
        ref={iframe}
        fullView={fullView}
      />
    </>
  );
}