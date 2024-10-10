import { useContext, useState, useRef, useEffect } from 'react';
import { EditorView, keymap, gutter, GutterMarker, lineNumbers }  from "@codemirror/view"
import { standardKeymap, } from "@codemirror/commands"
import { FilesContext } from '..';

const emptyMarker = new class extends GutterMarker {
  toDOM() { return document.createTextNode("ø") }
}

export default function Editor({ fileName }) {
  const { filesValue, setFileValue } = useContext(FilesContext);
  const [currentFile, setCurrentFile] = useState();

  const codemirrorContainerRef = useRef(null);
  const editorRef = useRef();

  useEffect(() => {
    editorRef.current = new EditorView({
      parent: codemirrorContainerRef.current,
      extensions: [
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
    <section>
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
}