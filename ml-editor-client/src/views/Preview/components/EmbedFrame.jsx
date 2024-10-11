import React, { useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';
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

const NOT_EXTERNAL_LINK_REGEX = /^(?!(http:\/\/|https:\/\/))/;

const resolvePathToFile = function(filePath, files) {
  if (filePath === undefined) {
    return false;
  }

  const filePathArray = filePath.split('/');
  let resolvedFile;
  let currentFile = files.find((file) => file.name === 'root');
  filePathArray.some((filePathSegment, index) => {
    if (filePathSegment === '' || filePathSegment === '.') {
      return false;
    } else if (filePathSegment === '..') {
      return true;
    }

    let foundChild = false;
    const childFiles = currentFile.children.map((childFileId) =>
      files.find(
        (file) => file._id.valueOf().toString() === childFileId.valueOf()
      )
    );
    childFiles.some((childFile) => {
      if (childFile.name === filePathSegment) {
        currentFile = childFile;
        foundChild = true;
        if (index === filePathArray.length - 1) {
          resolvedFile = childFile;
        }
        return true;
      }
      return false;
    });
    return !foundChild;
  });
  return resolvedFile;
}

const resolveScripts = function(sketchDoc, files) {
  const scriptsInHTML = sketchDoc.getElementsByTagName('script');
  const scriptsInHTMLArray = Array.prototype.slice.call(scriptsInHTML);
  scriptsInHTMLArray.forEach((script) => {
    const src = script.getAttribute('src')
    if (src && src.match(NOT_EXTERNAL_LINK_REGEX) !== null) {
      const resolvedFile = resolvePathToFile(src, files);
      if (resolvedFile) {
        if (resolvedFile.url) {
          script.setAttribute('src', resolvedFile.url);
        } else {
          const blobUrl = createBlobUrl(resolvedFile);
          script.setAttribute('src', blobUrl);
        }
      }
    }
  });
}

function resolveStyles(sketchDoc, files) {
  const cssLinksInHTML = sketchDoc.querySelectorAll('link[rel="stylesheet"]');
  const cssLinksInHTMLArray = Array.prototype.slice.call(cssLinksInHTML);
  cssLinksInHTMLArray.forEach((css) => {
    const href = css.getAttribute('href')
    if (href && href.match(NOT_EXTERNAL_LINK_REGEX) !== null) {
      const resolvedFile = resolvePathToFile(href, files);
      if (resolvedFile) {
        if (resolvedFile.url) {
          css.href = resolvedFile.url;
        } else {
          const style = sketchDoc.createElement('style');
          style.innerHTML = `\n${resolvedFile.content}`;
          sketchDoc.head.appendChild(style);
          css.parentElement.removeChild(css);
        }
      }
    }
  });
}

const injectLocalFiles = function (files, htmlFile, options) {
  const { basePath } = options;
  const parser = new DOMParser();
  const sketchDoc = parser.parseFromString(htmlFile.content, 'text/html');

  const base = sketchDoc.createElement('base');
  base.href = `${window.origin}${basePath}${basePath.length > 1 && '/'}`;
  sketchDoc.head.appendChild(base);

  resolveScripts(sketchDoc, files);
  resolveStyles(sketchDoc, files);

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
  
  const htmlFile = useMemo(() => (files.filter((file) => file.name === 'index.html')[0]), [files]);

  useEffect(() => {
    const doc = iframe.current;
    if (isPlaying) {
      const htmlDoc = injectLocalFiles(files, htmlFile, {
        basePath,
      });
      const htmlUrl = createBlobUrl({
        name: htmlFile.name,
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

export default EmbedFrame;