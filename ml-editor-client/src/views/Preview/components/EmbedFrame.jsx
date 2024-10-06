import React, { useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as blobUtil from 'blob-util';
import mime from 'mime';

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

function injectLocalFiles(files, htmlFile, options) {
  const { basePath } = options;
  const parser = new DOMParser();
  const sketchDoc = parser.parseFromString(htmlFile.content, 'text/html');

  const base = sketchDoc.createElement('base');
  base.href = `${window.origin}${basePath}${basePath.length > 1 && '/'}`;
  sketchDoc.head.appendChild(base);

  return `<!DOCTYPE HTML>\n${sketchDoc.documentElement.outerHTML}`;
}

function createBlobUrl(file) {
  if (file.blobUrl) {
    blobUtil.revokeObjectURL(file.blobUrl);
  }

  const mimeType = mime.getType(file.name) || 'text/plain';

  const fileBlob = blobUtil.createBlob([file.content], { type: mimeType });
  const blobURL = blobUtil.createObjectURL(fileBlob);
  return blobURL;
}

function EmbedFrame({ files, isPlaying, basePath }) {
  const iframe = useRef();
  const htmlFile = useMemo(() => (files.filter((file) => file.name.match(/.*\.html$/i))[0]), [files]);

  useEffect(() => {
    const doc = iframe.current;
    if (isPlaying) {
      const htmlDoc = injectLocalFiles(files, htmlFile, {
        basePath,
      });
      const htmlUrl = createBlobUrl({
        name: 'index.html',
        content: htmlDoc
      });

      setTimeout(() => {
        doc.src = htmlUrl;
      }, 0);
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