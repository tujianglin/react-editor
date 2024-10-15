import editorStore from '@/Editor/store/editorStore';
import eventStore from '@/Editor/store/eventStore';
import { DynamicComponent } from '@/packages/helper/DynamicComponent';
import { Tabs } from 'antd';
import { observer } from 'mobx-react';
import Common from './components/Common';
import Group from './components/Group';
import System from './components/System';

const ConfigPanel = observer(() => {
  const { curLayer } = editorStore!;
  const { selectedTargets } = eventStore!;
  return (
    <div className="wh-full overflow-auto px-4">
      {selectedTargets?.length > 1 ? (
        <Tabs centered items={[{ label: '组设置', key: 'group', children: <Group /> }]} />
      ) : curLayer ? (
        <Tabs
          centered
          items={[
            {
              label: '私有属性',
              key: 'private',
              children: <>{curLayer ? <DynamicComponent is={`${curLayer.type}Config`} {...curLayer} /> : <div>22</div>}</>,
            },
            { label: '公共属性', key: 'common', children: <Common {...curLayer} /> },
          ]}
        />
      ) : (
        <Tabs centered items={[{ label: '系统设置', key: 'system', children: <System /> }]} />
      )}
    </div>
  );
});

export default ConfigPanel;
