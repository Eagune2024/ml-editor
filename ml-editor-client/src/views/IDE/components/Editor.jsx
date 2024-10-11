import React, { useContext, useState, useRef, useEffect, useImperativeHandle } from 'react';
import { FilesContext } from '..';
import { EditorView, keymap, gutter, GutterMarker, lineNumbers }  from "@codemirror/view"
import { standardKeymap } from "@codemirror/commands"
import { EditorState, Compartment } from "@codemirror/state"
import { syntaxHighlighting, defaultHighlightStyle } from "@codemirror/language"
import { html } from "@codemirror/lang-html"
import { javascript } from "@codemirror/lang-javascript"
import { css } from "@codemirror/lang-css"
import { json } from "@codemirror/lang-json"

const languageConf = new Compartment
let currentFileMode
const getFileMode = (fileName) => {
  let mode;
  if (fileName.match(/.+\.js$/i)) {
    mode = 'javascript';
  } else if (fileName.match(/.+\.css$/i)) {
    mode = 'css';
  } else if (fileName.match(/.+\.(html|xml)$/i)) {
    mode = 'htmlmixed';
  } else if (fileName.match(/.+\.json$/i)) {
    mode = 'application/json';
  } else {
    mode = 'text/plain';
  }
  return mode;
}
const autoLanguage = EditorState.transactionExtender.of(tr => {
  if (currentFileMode === 'htmlmixed') {
    return { effects: languageConf.reconfigure(html()) }
  } else if (currentFileMode === 'javascript') {
    return { effects: languageConf.reconfigure(javascript()) }
  } else if (currentFileMode === 'css') {
    return { effects: languageConf.reconfigure(css()) }
  } else if (currentFileMode === 'json') {
    return { effects: languageConf.reconfigure(json()) }
  }
  return undefined
})

const emptyMarker = new class extends GutterMarker {
  toDOM() { return document.createTextNode("ø") }
}

export default React.forwardRef(function Editor(props, ref) {
  const { filesValue, setFileValue } = useContext(FilesContext);
  const [currentFile, setCurrentFile] = useState();

  const codemirrorContainerRef = useRef(null);
  const editorRef = useRef();

  const getContent = () => {
    const content = editorRef.current.viewState.state.doc.toString() || ''
    return content
  }
  
  useImperativeHandle(ref, () => ({
    getContent
  }))

  useEffect(() => {
    const curFile = filesValue.files?.find((file) => file.id === filesValue.selectedFile)
    setCurrentFile(curFile)
    const currentDocLen = editorRef.current?.viewState.state.doc.length
    if (curFile) {
      currentFileMode = getFileMode(curFile.name)
      editorRef.current?.dispatch({ changes: { from: 0, to: currentDocLen, insert: curFile.content } })
    }
  }, [filesValue])

  useEffect(() => {
    editorRef.current = new EditorView({
      parent: codemirrorContainerRef.current,
      extensions: [
        languageConf.of(html()),
        syntaxHighlighting(defaultHighlightStyle),
        autoLanguage,
        lineNumbers(),
        gutter({
          class: "cm-mygutter",
          lineMarker(view, line) {
            return line.from == line.to ? emptyMarker : null
          },
          initialSpacer: () => emptyMarker
        }),
        keymap.of(standardKeymap)
      ],
    });

    return () => { editorRef.current.destroy() }
  }, []);

  return (
    <section ref={ref}>
      <div className="editor__header">
        <button
          className="sidebar__contract"
        >
          ←
        </button>
        <button
          className="sidebar__expand"
        >
          →
        </button>
        <div className="editor__file-name">
          <span>
            { currentFile?.name }
          </span>
        </div>
      </div>
      <article
        ref={codemirrorContainerRef}
        className="editor-holder"
      />
    </section>
  )
})