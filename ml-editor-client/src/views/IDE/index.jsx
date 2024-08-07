import RootPage from "../../layout/RootPage";
import SplitPane from 'react-split-pane';

const IDEView = () => {
  return (
    <RootPage>
      <SplitPane
        split='vertical'
      >
        <SplitPane>
          <main className="editor-preview-container">
            <section className="preview-frame-holder">
              <header className="preview-frame__header">
                <h2 className="preview-frame__title">预览</h2>
              </header>
              <div className="preview-frame__content">
              </div>
            </section>
          </main>
        </SplitPane>
      </SplitPane>
    </RootPage>
  )
}

export default IDEView;