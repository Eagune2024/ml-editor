import React from 'react';

const EditorAccessibility = React.memo(({ lintMessages = [], currentLine }) => {
  const lineText = `第 ${currentLine} 行`

  return (
    <div className="editor-accessibility">
      <ul className="editor-lintmessages" title="lint messages">
        {lintMessages.length > 0 ? (
          lintMessages.map((lintMessage) => (
            <li key={lintMessage.id}>
              {lintMessage.severity} in line
              {lintMessage.line} :{lintMessage.message}
            </li>
          ))
        ) : (
          <li key={0}>没有纠码器消息</li>
        )}
      </ul>
      <p>
        {' '}
        当前行
        <span
          className="editor-linenumber"
          aria-live="polite"
          aria-atomic="true"
          id="current-line"
        >
          {lineText}
        </span>
      </p>
    </div>
  );
});

export default EditorAccessibility;