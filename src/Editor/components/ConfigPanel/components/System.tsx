import editorStore from '@/Editor/store/editorStore';
import { LayerItem } from '@/packages/types/component';
import { Form, InputNumber, Select } from 'antd';
import { cloneDeep, merge } from 'lodash-es';
import { observer } from 'mobx-react';

const Group = observer(() => {
  const { layerList, system, updateSystem, updateLayer } = editorStore!;

  const list = layerList.map((i) => ({ label: i.name, value: i.properties.name.value }));
  return (
    <Form labelAlign="left" colon={false} labelCol={{ span: 6 }}>
      <Form.Item label={'主窗口'}>
        <Select value={system?.name} options={list} onChange={(e) => updateSystem({ name: e })} />
      </Form.Item>
      <Form.Item label={'屏幕宽度'}>
        <InputNumber
          className="w-full"
          value={system?.width}
          onChange={(e) => {
            updateSystem({ width: e });
            const windows: LayerItem[] = cloneDeep(layerList).map((i) => i);
            windows.map((i) => merge(i, { properties: { width: { value: e } } }));
            updateLayer(windows);
          }}
        />
      </Form.Item>
      <Form.Item label={'屏幕高度'}>
        <InputNumber
          className="w-full"
          value={system?.height}
          onChange={(e) => {
            updateSystem({ height: e });
            const windows: LayerItem[] = cloneDeep(layerList).map((i) => i);
            windows.map((i) => merge(i, { properties: { height: { value: e } } }));
            updateLayer(windows);
          }}
        />
      </Form.Item>
    </Form>
  );
});
export default Group;
