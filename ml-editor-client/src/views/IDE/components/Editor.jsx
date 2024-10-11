import React, { useContext, useState, useRef, useEffect, useImperativeHandle } from 'react';
import { FilesContext } from '..';
import { EditorView, keymap, gutter, GutterMarker, lineNumbers }  from "@codemirror/view"
import { standardKeymap } from "@codemirror/commands"
import { EditorState, Compartment } from "@codemirror/state"
import { htmlLanguage, html } from "@codemirror/lang-html"
import { language, syntaxHighlighting, defaultHighlightStyle } from "@codemirror/language"
import { javascript } from "@codemirror/lang-javascript"

const languageConf = new Compartment
const autoLanguage = EditorState.transactionExtender.of(tr => {
  if (!tr.docChanged) return null
  let docIsHTML = /^\s*</.test(tr.newDoc.sliceString(0, 100))
  let stateIsHTML = tr.startState.facet(language) == htmlLanguage
  console.log(docIsHTML, stateIsHTML)
  if (docIsHTML == stateIsHTML) return null
  return {
    effects: languageConf.reconfigure(docIsHTML ? html() : javascript())
  }
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

  useEffect(() => {
    const curFile = filesValue.files?.find((file) => file.id === filesValue.selectedFile)
    setCurrentFile(curFile)
    const currentDocLen = editorRef.current.viewState.state.doc.length
    if (curFile?.content) editorRef.current.dispatch({ changes: { from: 0, to: currentDocLen, insert: curFile.content } })
  }, [filesValue])

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