import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Frame = styled.iframe`
  min-height: 100%;
  min-width: 100%;
  position: absolute;
  border-width: 0;
  ${({ fullView }) =>
    fullView &&
    `
    position: relative;
  `}
`;

function EmbedFrame({ files, isPlaying, basePath }) {
  const iframe = useRef();
  useEffect(() => {
    const doc = iframe.current;
    if (isPlaying) {
      console.log(files)
    } else {
      doc.src = '';
    } 
  }, [files, isPlaying]);

  return (
    <Frame
      aria-label="Sketch Preview"
      role="main"
      frameBorder="0"
      ref={iframe}
    />
  );
}

EmbedFrame.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  ).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  basePath: PropTypes.string.isRequired,
};

export default EmbedFrame;