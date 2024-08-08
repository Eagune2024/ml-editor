import { EditorView, keymap, gutter, GutterMarker, lineNumbers }  from "@codemirror/view"
import { standardKeymap, } from "@codemirror/commands"
import { useState, useRef, useEffect } from "react";

const emptyMarker = new class extends GutterMarker {
  toDOM() { return document.createTextNode("ø") }
}

export default function Editor({ fileName }) {
  const codemirrorContainerRef = useRef(null);

  useEffect(() => {
    let editorView = new EditorView({
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

    return () => { editorView.destroy() }
  }, []);

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
            { fileName }
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