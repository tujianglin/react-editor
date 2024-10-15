import { exportToIo } from '@/utils/export';
import { DownloadOutlined, SaveOutlined } from '@ant-design/icons';
import { FloatButton, Layout } from 'antd';
import { cloneDeep } from 'lodash-es';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import ConfigPanel from './components/ConfigPanel';
import LeftPanel from './components/LeftPanel';
import MainCanvas from './components/MainCanvas';
import EditorLoader from './loader/EditorLoader';
import editorStore from './store/editorStore';

const Editor = observer(() => {
  useEffect(() => {
    EditorLoader.load();
    editorStore.setComponentList();
    EditorLoader.getLocalStorage();
    // editorStore.getGlobalData();
  }, []);

  return (
    <Layout className="wh-full" onDragOver={(e) => e.preventDefault()}>
      <PanelGroup direction="horizontal">
        <Panel className="pos-relative min-w-310px bg-#fff">
          <LeftPanel />
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={70} className="pos-relative">
          <MainCanvas />
        </Panel>
        <PanelResizeHandle />
        <Panel className="pos-relative min-w-350px bg-#fff" onMouseDown={(e) => e.stopPropagation()}>
          <ConfigPanel />
        </Panel>
      </PanelGroup>
      <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
        <FloatButton
          icon={<SaveOutlined />}
          onClick={() => {
            localStorage.setItem('layerList', JSON.stringify(editorStore.layerList));
          }}
        />
        <FloatButton
          icon={<DownloadOutlined />}
          onClick={() => {
            exportToIo(cloneDeep(editorStore.layerList));
          }}
        />
      </FloatButton.Group>
    </Layout>
  );
});

export default Editor;
