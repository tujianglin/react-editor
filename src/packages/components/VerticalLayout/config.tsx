import editorStore from '@/Editor/store/editorStore';
import GlobalTreeSelect from '@/packages/helper/GlobalTreeSelect';
import { LayerItem } from '@/packages/types/component';
import { treeForEach } from '@/utils/tree';
import { Divider, Form, Select, Switch } from 'antd';
import { observer } from 'mobx-react';
import { IVerticalLayout } from './default';

const VerticalLayoutConfig = observer(({ properties, id }: LayerItem<IVerticalLayout>) => {
  const { updateCurLayer, layerList } = editorStore!;

  const list = [];
  treeForEach(layerList, (i) => {
    if (i.pid === id) {
      list.push({ label: i.name, value: i.properties.name.value });
    }
  });
  return (
    <Form labelAlign="left" colon={false} labelCol={{ span: 6 }}>
      <Divider className="!mt-0">属性</Divider>
      <Form.Item label={'水平滚动条'}>
        <GlobalTreeSelect field="hScroll">
          <Switch value={properties.hScroll.value} onChange={(e) => updateCurLayer<IVerticalLayout>({ id, properties: { hScroll: { value: e } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'垂直滚动条'}>
        <GlobalTreeSelect field="vScroll">
          <Switch value={properties.vScroll.value} onChange={(e) => updateCurLayer<IVerticalLayout>({ id, properties: { vScroll: { value: e } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'是否换货'}>
        <GlobalTreeSelect field="wrap">
          <Switch value={properties.wrap.value} onChange={(e) => updateCurLayer<IVerticalLayout>({ id, properties: { wrap: { value: e } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'对齐方式'}>
        <GlobalTreeSelect field="layoutAlignment">
          <Select
            value={properties.layoutAlignment.value}
            options={[
              { label: '左边对齐', value: 0 },
              { label: '右边对齐', value: 1 },
              { label: '居中对齐', value: 2 },
            ]}
            onChange={(e) => updateCurLayer<IVerticalLayout>({ id, properties: { layoutAlignment: { value: e } } })}
          />
        </GlobalTreeSelect>
      </Form.Item>
      <Form.Item label={'填充元素'}>
        <GlobalTreeSelect field="fillItem">
          <Select value={properties.fillItem.value} allowClear options={list} onChange={(e) => updateCurLayer<IVerticalLayout>({ id, properties: { fillItem: { value: e } } })} />
        </GlobalTreeSelect>
      </Form.Item>
      <Divider>事件</Divider>
    </Form>
  );
});

export default VerticalLayoutConfig;
